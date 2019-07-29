const jwt = require('jsonwebtoken');
const users = require('../users');
require('dotenv').config();

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await users.find(item => item.username === username);
        
        if(!user) {
            throw new Error('User not found');
        }
        
        if(user.password !== req.body.password) {
            throw new Error('Password does not match');
        }
        
        const token = jwt.sign(
            { id: user.id },
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