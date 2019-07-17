require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var setupController = require('./controllers/setup');
var apiController = require('./controllers/api');

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
setupController(app);
apiController(app);

app.listen(process.env.PORT);