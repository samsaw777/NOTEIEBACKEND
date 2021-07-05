const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
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
  postedBy: {
    type: ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("noteitdatabase", noteit);
