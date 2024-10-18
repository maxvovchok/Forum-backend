const { model, Schema } = require("mongoose");

const User = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    ref: "Role",
  },
});

module.exports = model("User", User);
