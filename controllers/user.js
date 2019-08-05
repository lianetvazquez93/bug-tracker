const Users = require('../models/user');

const register = async (req, res) => {
    try {
        await Users.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        res.send('User saved!');
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
        await Users.deleteOne({email: req.user});
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
