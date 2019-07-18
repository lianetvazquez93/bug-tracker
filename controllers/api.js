const Bugs = require('../models/bug');

const handleError = (error, res) => {
    console.error(`Error: ${error.message}`);
    res.status(400).send({Error: error.message});
};

const getAll = async (req, res) => {
    try {
        let bugs = await Bugs.find();
        res.send(bugs);
    } catch(err) {
        handleError(err, res);
    }
};

const getById = async (req, res) => {
    try {
        let bug = await Bugs.findById(req.params.id);
        res.send(bug);
    } catch(error) {
        handleError(error, res);
    }
}

const getByStatus = async (req, res) => {
    try {
        let bugs = await Bugs.find({status: req.params.status});
        res.send(bugs);
    } catch(error) {
        handleError(error, res);
    }
}

/*module.exports = function(app) {
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
    getAll,
    getById,
    getByStatus
};