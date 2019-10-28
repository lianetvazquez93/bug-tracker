const mongoose = require("mongoose");

const bugSchema = mongoose.Schema({
  title: String,
  body: String,
  reporterEmail: String,
  status: String,
});

module.exports = mongoose.model("Bug", bugSchema);
