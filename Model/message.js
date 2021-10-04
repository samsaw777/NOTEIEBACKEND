const mongoose = require("mongoose");
const { ObjectId, String } = mongoose.Schema.Types;
const noteit = mongoose.Schema({
  text: {
    type: "string",
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: "user",
  },
  postedByName: {
    type: String,
    ref: "user",
  },
  groupOn: {
    type: ObjectId,
    ref: "noteitdatabase",
  },
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("groupdatabase", noteit);
