const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("noteitdatabase", noteit);
