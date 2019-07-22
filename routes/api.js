const apiController = require('../controllers/api');

module.exports = (app) => {
    app.get('/api/bugs', apiController.getAll);

    app.get('/api/bug/:id', apiController.getById);

    app.post('/api/bug', apiController.reportNewBug);

    app.delete('/api/bug', apiController.deleteBug);

    app.put('/api/bug', apiController.updateBug);
}