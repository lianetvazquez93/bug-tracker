const Bugs = require('../models/bug');
const bodyParser = require('body-parser');

const getAll = async (req, res) => {
    try {
        let bugs = Bugs.find();
        res.send(bugs);
    } catch(err) {
        console.error(`Error: ${err.message}`);
        res.send('Bad Request');
    }
};

/*module.exports = function(app) {
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
    });

    app.delete('/api/bug', function(req, res) {
        Bugs.findByIdAndRemove(req.body.id, function(err) {
            if(err) throw err;
            res.send('Success');
        });
    });
};
*/
module.exports = {
    getAll: getAll
};