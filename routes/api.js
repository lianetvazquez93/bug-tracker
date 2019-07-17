const apiController = require('../controllers/api');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/api/bugs', apiController.getAll);
}