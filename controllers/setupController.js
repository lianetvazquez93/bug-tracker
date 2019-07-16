var Bugs = require('../models/bugModel');

module.exports = function(app) {
    app.get('/api/setupBugs', function(req, res) {
        //seed database
        var starterBugs = [
            {
                title: 'bug1',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                reporterEmail: 'user1@gmail.com',
                status: 'opened'
            },
            {
                title: 'bug2',
                body: 'Donec semper tempor arcu, a sagittis massa ullamcorper id.',
                reporterEmail: 'user2@gmail.com',
                status: 'opened'
            },
            {
                title: 'bug3',
                body: 'Integer pharetra, felis at consectetur vulputate, nulla ipsum mattis metus, eu convallis eros nisl nec augue.',
                reporterEmail: 'user2@gmail.com',
                status: 'opened'
            },
            {
                title: 'bug4',
                body: 'Aenean non vestibulum velit. Sed mauris dui, faucibus sed gravida porta, tincidunt id ipsum.',
                reporterEmail: 'user1@gmail.com',
                status: 'opened'
            }
        ];
        Bugs.create(starterBugs, function(err, results) {
            res.send(results);
        });
    });
};