var express = require('express');
var router = express.Router();
var Exp = require('../models/experiment');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/login');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/login', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('login', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/signin', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/', isAuthenticated, function(req, res){
		res.render('index', { user: req.user });
	});

	/* GET Profile Page */
	router.get('/profile', isAuthenticated, function(req, res){
		res.render('profile', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// =====================================
    // EXPERIMENT ROUTES ===================
    // =====================================

    /* finish */
    router.get('/finish', isAuthenticated, function(req, res){
		res.render('finish', { user: req.user });
	});

	/* hello-world */
	router.get('/exp/hello-world', isAuthenticated, function(req, res){
		res.render('exp/hello-world', { user: req.user });
	});

	/* go-nogo */
	router.get('/exp/go-nogo', isAuthenticated, function(req, res){
	    res.render('exp/go-nogo', { user: req.user });
	});

	/* save-experiment-data */
	router.get('/exp/finish', isAuthenticated, function(req, res){
	    res.render('exp/finish', { user: req.user });
	})

	router.post('/exp/save-data', isAuthenticated, function(req, res){

		var tempEmail, tempName;
		if(req.user.local.username){
			tempName = req.user.local.username;
			tempEmail = req.user.local.email;
		}
		else{
			tempName = req.user.google.name;
			tempEmail = req.user.google.email;
		}
		var tempDate = new Date();

		Exp.findOne({ 'name' :  req.body.name, 'subject.subjectId' :  req.user._id },
		 function(err, exp) {
		 	// In case of any error, return using the done method
            if (err){
                console.log('Error in save-experiment-data');
                return done(err);
            }
            // exists
            if (exp) {
            	// push experiment
				for(i in exp.subject){
				    if(exp.subject[i].subjectId == req.user._id){
		            	exp.subject[i].experiment.push({
		            		date	 : tempDate.toJSON(),
							data	 : req.body.data
		            	});
		            	exp.save(function(err) {
							if (err){
							    console.log('Error in save: '+err);  
							    throw err;  
							}
							console.log('Save succesful');    
							res.end();
						});
				    }
				    console.log('Error in save: no subject found');
				    res.end();
				}
            } else {
		    	Exp.findOne({ 'name' :  req.body.name }, function(err, exp) {
					// In case of any error, return using the done method
		            if (err){
		                console.log('Error in save-experiment-data');
		                return done(err);
		            }
		            // exists
		            if (exp) {
		            	// create subject and push
		            	exp.subject.push({
		            		subjectId	 : req.user._id,
							name		 : tempName,
							email		 : tempEmail,
							experiment 	 : [{
								date	 : tempDate.toJSON(),
								data	 : req.body.data
							}]
		            	});
		            	exp.save(function(err) {
							if (err){
							    console.log('Error in save: '+err);  
							    throw err;  
							}
							console.log('Save succesful');    
							res.end();
						});
		            } else {
		                // if there is no experiment
		                // create it with the subject
		               	var newExpData = new Exp();
						newExpData.name = req.body.name;
						newExpData.subject = [{
							subjectId	 : req.user._id,
							name		 : tempName,
							email		 : tempEmail,
							experiment 	 : [{
								date	 : tempDate.toJSON(),
								data	 : req.body.data
							}]
						}];				
						newExpData.save(function(err){
							if(err){
								console.log('Error in save: '+err);  
				                throw err;
							}
							console.log('Save succesful');
							res.end();
						});
		            }
				});
            }
		});


	}) 

	// =====================================
    // EXPERIMENT ROUTES END ===============
    // =====================================


	// =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    router.get('/auth/google', passport.authenticate('loging', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    router.get('/auth/google/callback',
            passport.authenticate('loging', {
                    successRedirect : '/',
                    failureRedirect : '/login'
            }));

	return router;
}





