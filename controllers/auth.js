const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });

    if (!user) {
      throw new Error("User not found");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Password does not match");
    }

    const token = jwt.sign({ email: user.email }, process.env.SECRET);

    res.send({ token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  login,
};
