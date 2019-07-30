const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
