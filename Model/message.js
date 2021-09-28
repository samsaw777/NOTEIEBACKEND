const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const noteit = mongoose.Schema({
  text: {
    type: "string",
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: "user",
  },
  groupOn: {
    type: ObjectId,
    ref: "noteitdatabase",
  },
});

module.exports = mongoose.model("groupdatabase", noteit);
