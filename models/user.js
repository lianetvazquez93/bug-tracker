const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String
});

userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

userSchema.post('deleteOne', {document: true}, function() {
    let email = this.getQuery()["email"];
    mongoose.model("Bugs").deleteMany({reporterEmail: email}, function(err) {
        if(err) { throw err; }
    });
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
