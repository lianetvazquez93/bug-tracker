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

    app.get('/api/bug/:id', function(req, res) {
        Bugs.findById({_id: req.params.id}, function(err, bug) {
            if(err) throw err;
            res.send(bug);
        });
    });

    app.get('/api/bugs/:status', function(req, res) {
        Bugs.find({status: req.params.status}, function(err, bugs) {
            if(err) throw err;
            res.send(bugs);
        });
    });

    app.post('/api/bug', function(req, res) {
        if(req.body.id) {
            Bugs.findByIdAndUpdate(req.body.id, {title: req.body.title, 
                body: req.body.body, reporterEmail: req.body.reporterEmail, 
                status: req.body.status}, function(err, bug) {
                    if(err) throw err;
                    res.send('Success');
                });
        } else {
            var newBug = Bugs({
                title: req.body.title,
                body: req.body.body,
                reporterEmail: req.body.reporterEmail,
                status: "opened"
            });
            newBug.save(function(err) {
                if(err) throw err;
                res.send('Success');
            });
        }
    });
};