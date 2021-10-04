const express = require("express");
const app = express();
const Message = require("../Model/message");

//send the message
app.post("/sendmessage", async (req, res) => {
  const { text, groupId, userId, userName } = req.body;
  const newMessage = new Message({
    text: text,
    postedBy: userId,
    groupOn: groupId,
    postedByName: userName,
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
app.get("/getmessage/:id", async (req, res) => {
  const { id } = req.params;
  // s
  await Message.find({ groupOn: id })

    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send({ msg: err.message });
    });
});

module.exports = app;
