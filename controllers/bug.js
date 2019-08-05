const Bugs = require('../models/bug');

const handleError = (error, res) => {
    console.error(`Error: ${error.message}`);
    res.status(400).send({Error: error.message});
};

const getAll = async (req, res) => {
    try {
        const { id, status } = req.query;
        let bugs = [];
        if(id && !status) {
            bugs = await Bugs.find({reporterEmail: req.user, _id: id});
        } else if(status && !id) {
            bugs = await Bugs.find({reporterEmail: req.user, status: status});
        } else {
            bugs = await Bugs.find({reporterEmail: req.user});
        }
        
        res.send(bugs);
    } catch(err) {
        handleError(err, res);
    }
};

const reportNewBug = async (req, res) => {
    try {
        let newBug = Bugs({
            title: req.body.title,
            body: req.body.body,
            reporterEmail: req.user,
            status: "opened" 
        });
        newBug.save();
        res.send('Bug saved!');
    } catch(error) {
        handleError(error,res);
    }
};

const deleteBug = async (req, res) => {
    try {
        let bugToDelete = await Bugs.findById(req.body.id);
        if(bugToDelete.reporterEmail !== req.user) {
            throw new Error('Bug not found');
        }
        await Bugs.findByIdAndDelete(req.body.id);
        res.send('Bug deleted!');
    } catch(error) {
        handleError(error, res);
    }
};

const updateBug = async (req, res) => {
    try {
        const statusDictionary = {
            opened: 0,
            development: 1,
            closed: 2
        };
        let bugToUpdate = await Bugs.findById(req.body.id);
        if (bugToUpdate.reporterEmail !== req.user) {
            throw new Error('Bug not found');
        }
        if(req.body.status) {
            if(!(statusDictionary[req.body.status] - statusDictionary[bugToUpdate.status] === 1)) {
                throw new Error('Status update not posible');
            }
        }
        
        await Bugs.findByIdAndUpdate(req.body.id, {
            title: req.body.title,
            body: req.body.body,
            reporterEmail: req.body.reporterEmail,
            status: req.body.status
        }, {omitUndefined: true});
            
        res.send('Bug updated!');
        
    } catch(error) {
        handleError(error, res);
    }
};

module.exports = {
    getAll,
    reportNewBug, 
    deleteBug,
    updateBug
};