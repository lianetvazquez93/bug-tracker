const apiController = require('../controllers/api');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.get('/api/bugs', apiController.getAll);

    app.get('/api/bug/:id', apiController.getById);

    app.get('/api/bugs/:status', apiController.getByStatus);
}