
var mongoose = require('mongoose');
var emptySchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model('ExperimentData', emptySchema);