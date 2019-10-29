const mongoose = require("mongoose");

const bugSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["opened", "development", "closed"],
    default: "opened",
  },
  reporterEmail: String,
  reporterId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Bug", bugSchema);
