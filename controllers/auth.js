const jwt = require('jsonwebtoken');
const Users = require('../models/user');
require('dotenv').config();

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await Users.findOne({username: username});
        
        if(!user) {
            throw new Error('User not found');
        }
        
        if(user.password !== password) {
            throw new Error('Password does not match');
        }
        
        const token = jwt.sign(
            { email: user.email },
            process.env.SECRET
        );

        res.send({token});
    } catch(error) {
        console.log(error);
        res.status(400).send(error.message);
    }
};

module.exports = {
    login
};