const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { String, ObjectId } = mongoose.Schema.Types;
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
  friends: [{ type: String, ref: "user" }],
  followRequest: [{ type: String, ref: "user" }],
  joinedGroup: [
    {
      Id: { type: ObjectId, ref: "noteitdatabase" },
      Name: { type: String, ref: "noteitdatabase" },
    },
  ],
});

module.exports = mongoose.model("user", UserSchema);
