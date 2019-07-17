require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
let setupController = require('./controllers/setup');
let apiController = require('./controllers/api');

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
setupController(app);
apiController(app);

app.listen(process.env.PORT);