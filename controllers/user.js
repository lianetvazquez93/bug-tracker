const Users = require('../models/user');
const Bugs = require('../models/bug');
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

const deleteUser = async (req, res) => {
    try {
        await Users.findOneAndDelete({email: req.user});
        await Bugs.deleteMany({ reporterEmail: req.user });

        res.send('User deleted!');
    } catch(error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    register,
    profile,
    deleteUser
};
