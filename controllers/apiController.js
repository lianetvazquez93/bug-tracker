var Bugs = require('../models/bugModel');
var bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/api/bugs', function(req, res) {
        Bugs.find({}, function(err, bugs) {
            if(err) throw err;
            res.send(bugs);
        });
    });
};