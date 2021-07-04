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
  });
  await newnote
    .save()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ msg: err.message });
    });
});

//get the notes
app.get("/getnotes", auth, async (req, res) => {
  await Feed.find((err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = app;
