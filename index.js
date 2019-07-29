require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
let apiRoutes = require('./routes/api');

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true}).catch(error => {
    console.log(error.message);
    process.exit(1);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);

app.listen(process.env.PORT);