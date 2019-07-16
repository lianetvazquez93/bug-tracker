var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');

mongoose.connect('mongodb+srv://test:test@sandbox-70j33.mongodb.net/test?retryWrites=true&w=majority',
 {useNewUrlParser: true});
setupController(app);
apiController(app);

app.listen(3000);