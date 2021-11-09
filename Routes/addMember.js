const express = require("express");
const app = express.Router();
const Group = require("../Model/model");
const User = require("../Model/users");
const db = require("../firebase");

//add member to the group
app.post("/addmember", async (req, res) => {
  const { memberEmail, groupId, groupName, groupImage, memberImage, memberId } =
    req.body;
  console.log(memberId, groupId);
  const addToGroup = await db
    .collection("groups")
    .doc(`${groupId}`)
    .collection("members")
    .add({
      memberEmail,
      memberId,
      memberImage,
    });

  const addGroupToUser = await db
    .collection("users")
    .doc(`${memberId}`)
    .collection("groupsjoined")
    .add({
      groupId,
      groupName,
      groupImage,
    });

  await Promise.all([addToGroup, addGroupToUser])
    .then((result) => {
      return res.status(200).json("Member added to your group");
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

// app.get("/getusergroup", (req, res) => {
//   const { groupName } = req.body;
//   Group.findOne({ text: groupName })
//     .then((group) => {
//       res.json(group);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

app.post("/removemember", async (req, res) => {
  const { userId, groupId, userdocId } = req.body;

  const removeFromGroup = await db
    .collection("groups")
    .doc(`${groupId}`)
    .collection("members")
    .doc(`${userdocId}`)
    .delete();

  const removeFromUser = await db
    .collection("users")
    .doc(`${userId}`)
    .collection("groupsjoined")
    .where("groupId", "==", groupId)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });

  Promise.all([removeFromGroup, removeFromUser]).then((value) => {
    res.send("Member removed from the group!");
  });
});

module.exports = app;
