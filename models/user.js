const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

userSchema.post("findOneAndUpdate", async function(next) {
  try {
    const id = this.getQuery()["_id"];
    const { email } = await mongoose.model("User").findById(id);
    await mongoose
      .model("Bug")
      .updateMany({ reporterId: id }, { reporterEmail: email }, { omitUndefined: true });
  } catch (error) {
    next(error);
  }
});

userSchema.post("findOneAndDelete", async function(next) {
  try {
    const id = this.getQuery()["_id"];
    await mongoose.model("Bug").deleteMany({ reporterId: id });
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
