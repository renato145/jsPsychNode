// passport/auth.js

// expose our config directly to our application using module.exports
module.exports = {
/*
    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },
*/
    'google' : {
        'clientID'      : '932905206660-qhg4f6u8ao96kjn6onb551o64urf1mk0.apps.googleusercontent.com',
        'clientSecret'  : 'hbDQezzYEoeE7MfSzWpmYWQb',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};
