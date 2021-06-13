const express = require("express");
const app = express.Router();
const Feed = require("../Model/model");

//initial get route
app.get("/", (req, res) => {
  res.status(200).send({
    name: "sameep",
    standar: "BE in Information technology",
  });
});

//Post the notes
app.post("/savenotes", async (req, res) => {
  const message = req.body;
  await Feed.create(message, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).send(`New Message create: \n ${data}`);
    }
  });
});

//get the notes
app.get("/getnotes", async (req, res) => {
  await Feed.find((err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = app;
