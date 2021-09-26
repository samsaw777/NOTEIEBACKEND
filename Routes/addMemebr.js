const express = require("express");
const app = express.Router();
const Group = require("../Model/model");
const auth = require("../Middleware/auth");

// Add user to the group
app.post("/adduser", (req, res) => {
  const { Id, groupId } = req.body;
  //   if (Id === req.user._id) {
  //     return res.status(400).send("Cannot add yourself!");
  //   } else {
  Group.findByIdAndUpdate(
    groupId,
    { $push: { members: Id } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(500).send("Something went wrong!");
    } else {
      return res.status(201).json(result);
    }
  });
});

//remove user form the group
app.post("/removeuser", (req, res) => {
  const { Id, groupId } = req.body;
  //   if (Id === req.user._id) {
  //     return res.status(400).send("Cannot add yourself!");
  //   } else {
  Group.findByIdAndUpdate(
    groupId,
    { $pull: { members: Id } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(500).send("Something went wrong!");
    } else {
      return res.status(201).json(result);
    }
  });
});

module.exports = app;
