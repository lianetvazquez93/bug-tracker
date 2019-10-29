const Bug = require("../models/bug");

const getAll = async (req, res) => {
  try {
    const { id, status } = req.query;
    let bugs = [];
    if (id && !status) {
      bugs = await Bug.findById(id);
    } else if (status && !id) {
      bugs = await Bug.find({ status });
    } else {
      bugs = await Bug.find();
    }

    res.send(bugs);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const reportNewBug = async (req, res) => {
  try {
    const newBug = Bug({
      title: req.body.title,
      description: req.body.description,
      reporterEmail: req.user.email,
      reporterId: req.user.id,
    });
    await newBug.save();
    res.status(201).json(newBug);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const bugToDelete = await Bug.findById(id);
    if (!bugToDelete || bugToDelete.reporterEmail !== req.user.email) {
      throw new Error("Bug not found");
    }
    await Bug.findByIdAndDelete(id);
    res.send(await Bug.find());
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const update = async (req, res) => {
  try {
    const statusDictionary = {
      opened: 0,
      development: 1,
      closed: 2,
    };
    const id = req.params.id;
    const bugToUpdate = await Bug.findById(id);
    if (!bugToUpdate || bugToUpdate.reporterEmail !== req.user.email) {
      throw new Error("Bug not found");
    }
    if (req.body.status) {
      if (!(statusDictionary[req.body.status] - statusDictionary[bugToUpdate.status] === 1)) {
        throw new Error("Status update not posible");
      }
    }

    await Bug.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
      },
      { omitUndefined: true }
    );

    res.send(await Bug.findById(id));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAll,
  reportNewBug,
  update,
  remove,
};
