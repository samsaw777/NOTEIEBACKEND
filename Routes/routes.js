const express = require("express");
const app = express.Router();
const Feed = require("../Model/model");
const auth = require("../Middleware/auth");
const db = require("../firebase");
//initial get route
app.get("/", (req, res) => {
  res.status(200).send({
    name: "sameep",
    standar: "BE in Information technology",
  });
});

//Post the notes
app.post("/savenotes", auth, async (req, res) => {
  // console.log(req);
  const { text } = req.body;
  const randomValue = Math.floor(Math.random() * 5000);
  let url = `https://avatars.dicebear.com/api/gridy/${randomValue}.svg`;

  db.collection("groups")
    .add({
      groupName: text,
      postedBy: req.user.email,
      postedById: req.user.id,
      image: url,
    })
    .then((response) => {
      db.collection("groups")
        .doc(`${response.id}`)
        .get()
        .then((group) => {
          const groupInfo = group.data();
          groupInfo.id = response.id;
          res.send(groupInfo);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//get the notes
app.get("/getnotes", auth, async (req, res) => {
  // const { email } = req.body;
  await db
    .collection("groups")
    .where("postedBy", "==", req.user.email)
    .get()
    .then((response) => {
      const getNotes = [];

      response.docs.map((singleresponse) => {
        const note = singleresponse.data();
        note.id = singleresponse.id;
        getNotes.push(note);
      });
      res.send(getNotes);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/getgroupmembers/:id", async (req, res) => {
  const { id } = req.params;
  const allMembers = [];
  await db
    .collection("groups")
    .doc(`${id}`)
    .collection("members")
    .get()
    .then((members) => {
      members.docs.map((member) => {
        const memberinfo = member.data();
        memberinfo.id = member.id;
        allMembers.push(memberinfo);
      });
      res.send(allMembers);
    });
});

module.exports = app;
