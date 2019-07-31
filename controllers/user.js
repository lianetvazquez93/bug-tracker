const Users = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        bcrypt.hash(password, saltRounds, function(err, hash) {
            Users.create({
                username: username,
                password: hash,
                email: email
            });
        });
        res.send('Success');
    } catch(error) {
        res.status(400).send(error.message);
    }
};

const profile = async (req, res) => {
    try {
        const { username, email } = await Users.findOne({email: req.user});
        if(!username) {
            throw new Error('User not found');
        }
        res.send(`Username: ${username}, Email: ${email}.`);
    } catch(error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    register,
    profile
};
