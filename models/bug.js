const mongoose = require("mongoose");

const { Schema } = mongoose;

const bugSchema = new Schema({
  title: String,
  body: String,
  reporterEmail: String,
  status: String,
});

const Bugs = mongoose.model("Bugs", bugSchema);

module.exports = Bugs;
