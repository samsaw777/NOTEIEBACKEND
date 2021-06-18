const express = require("express");
const app = express.Router();

const mockusersapi = require("../Model/mock");

app.post("/savemock", async (req, res) => {
  const { answerText, questionEmbedId, user, created } = req.body;
  const mockuser = new mockusersapi({
    answerText: answerText,
    questionEmbedId: questionEmbedId,
    user: user,
    created: created,
  });
  await mockuser
    .save()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ msg: err.message });
    });
});

//get the notes
app.get("/getmock", async (req, res) => {
  await mockusersapi.find((err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = app;
