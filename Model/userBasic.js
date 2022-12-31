const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const { String } = mongoose.Schema.Types;

const UserBasic = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("userBasic", UserBasic);
