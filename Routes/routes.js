const express = require("express");
const app = express();
const Feed = require("../Model/model");




app.get("/", (req, res) => {
  res.status(200).send({
    name: "sameep",
    standar: "BE in Information technology",
  });
});



app.post("/notes", async (req, res) => {
  const message = req.body;
  await Feed.create(message, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).send(`New Message create: \n ${data}`);
    }
  });
});



module.exports = app;
