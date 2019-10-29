const User = require("../models/user");

const register = async (req, res) => {
  try {
    const newUser = User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    await newUser.save();
    res.status(201).json(await User.findById(newUser.id).select("-password"));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new Error("User not found");
    }
    res.json(await User.findById(user._id).select("-password"));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const userToDelete = await User.findById(id);

    if (!userToDelete) {
      throw new Error("User not found");
    }

    if (userToDelete.email !== req.user.email) {
      throw new Error("Not Authorized");
    }
    await User.findByIdAndDelete(id);
    res.send(await User.find().select("-password"));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userToUpdate = await User.findById(id);

    if (!userToUpdate) {
      throw new Error("User not found");
    }

    if (userToUpdate.email !== req.user.email) {
      throw new Error("Not authorized");
    }

    const { username, email, password } = req.body;

    if (password) {
      userToUpdate.password = password;
      await userToUpdate.save();
    }

    await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
      },
      { omitUndefined: true }
    );

    res.json(await User.findById(id).select("-password"));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  register,
  profile,
  update,
  remove,
};
