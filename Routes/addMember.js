const express = require("express");
const app = express.Router();
const Group = require("../Model/model");
const User = require("../Model/users");
//add member to the group
app.post("/addmember", async (req, res) => {
  const { memberEmail, groupId, groupName } = req.body;
  const group = await Group.findByIdAndUpdate(
    groupId,
    {
      $push: { members: memberEmail },
    },
    { new: true }
  ).exec();

  const user = await User.findOneAndUpdate(
    { email: memberEmail },
    {
      $push: { joinedGroup: [{ Id: groupId, Name: groupName }] },
    },
    { new: true }
  ).exec();

  await Promise.all([group, user])
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

app.get("/getusergroup", (req, res) => {
  const { groupName } = req.body;
  Group.findOne({ text: groupName })
    .then((group) => {
      res.json(group);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = app;
