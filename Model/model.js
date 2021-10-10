const mongoose = require("mongoose");
const { String, ObjectId } = mongoose.Schema.Types;
const noteit = mongoose.Schema({
  text: {
    type: "string",
    required: true,
  },
  color: {
    type: "string",
    required: true,
  },
  weight: {
    type: "number",
    required: true,
  },
  image: {
    type: "string",
  },
  members: [{ type: String, ref: "user" }],
  postedBy: {
    type: ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("noteitdatabase", noteit);
