const mongoose = require("mongoose");

const noteit = mongoose.Schema({
  text: {
    type: "string",
    require: true,
  },
});


module.exports = mongoose.model("noteitdatabase",noteit);
