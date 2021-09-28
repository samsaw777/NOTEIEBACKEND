const express = require("express");
const app = express();
const Message = require("../Model/message");

//send the message
app.post("/sendmessage", async (req, res) => {
  const { text, groupId, userId } = req.body;
  const newMessage = new Message({
    text: text,
    postedBy: userId,
    groupOn: groupId,
  });
  await newMessage
    .save()
    .then((message) => {
      res.status(200).send(message);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//get messages
app.get("/getmessage", async (req, res) => {
  const { groupId } = req.body;
  await Message.find({ groupOn: groupId })
    .populate("postedBy", "_id email name")
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send({ msg: err.message });
    });
});

module.exports = app;
