var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bugSchema = new Schema({
    title: String,
    body: String,
    reporterEmail: String,
    status: String
});

var Bugs = mongoose.model('Bugs', bugSchema);

module.exports = Bugs;