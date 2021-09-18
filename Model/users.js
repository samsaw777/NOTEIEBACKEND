const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
  },
  resetPasswordToken: {
    type: "string",
  },
  tokenExpries: Date,
});

module.exports = mongoose.model("user", UserSchema);
