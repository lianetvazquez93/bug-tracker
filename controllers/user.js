const Users = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        await bcrypt.hash(password, saltRounds, function(err, hash) {
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

module.exports = {
    register
};
