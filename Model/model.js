const mongoose = require("mongoose");

const noteit = mongoose.Schema({
  text: {
    type: "string",
    required: true,
  },
});

module.exports = mongoose.model("noteitdatabase", noteit);
