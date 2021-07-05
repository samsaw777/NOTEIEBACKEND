const express = require("express");
const app = express.Router();
const Feed = require("../Model/model");
const auth = require("../Middleware/auth");
//initial get route
app.get("/", (req, res) => {
  res.status(200).send({
    name: "sameep",
    standar: "BE in Information technology",
  });
});

//Post the notes
app.post("/savenotes", auth, async (req, res) => {
  const { text, color, weight } = req.body;
  const newnote = new Feed({
    text: text,
    color: color,
    weight: weight,
    postedBy: req.user,
  });
  await newnote
    .save()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ msg: err });
    });
});

//get the notes
app.get("/getnotes", auth, async (req, res) => {
  await Feed.find({ postedBy: req.user._id })
    .populate("postedBy", "_id")
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send({ msg: err.message });
    });
});

module.exports = app;
