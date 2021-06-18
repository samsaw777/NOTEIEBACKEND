const mongoose = require("mongoose");
const mockapi = mongoose.Schema({
  answerText: {
    type: "string",
    required: true,
  },
  questionEmbedId: {
    type: "string",
    required: true,
  },
  user: {
    email: {
      type: "string",
      required: true,
    },
  },
  created: {
    type: "string",
    required: true,
  },
});

module.exports = mongoose.model("mockbase", mockapi);
