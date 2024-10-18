const { Schema, model } = require("mongoose");
const { modelName } = require("./userModel");

const Role = new Schema({
  value: { type: String, require: true, default: "user" },
});

module.exports = model("Role", Role);
