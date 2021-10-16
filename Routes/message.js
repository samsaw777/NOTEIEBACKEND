const express = require("express");
const router = express.Router();
const db = require("../firebase");

//Get the messages from the firestore
router.get("/getmessages/:id", async (req, res) => {
  const getMessages = [];
  const { id } = req.params;
  console.log(id);
  await db
    .collection("groups")
    .doc(`${id}`)
    .collection("messages")
    // .orderBy("time", "asc")
    .onSnapshot((snapshot) => {
      snapshot.docs.map((message) => {
        const newMessage = message.data();
        newMessage.id = message.id;
        getMessages.push(newMessage);
      });
      res.send(getMessages);
    });
});

//Post the message to the firebase
router.post("/postmessage", async (req, res) => {
  const {
    id,
    title,
    description,
    tag,
    fileName,
    fileUrl,
    time,
    postedBy,
    postedByEmail,
    userImage,
  } = req.body;
  console.log(title);
  await db
    .collection("groups")
    .doc(`${id}`)
    .collection("messages")
    .add({
      title,
      description,
      tag,
      fileName,
      time,
      postedBy,
      postedByEmail,
      userImage,
      fileUrl,
    })
    .then((sendmessage) => {
      res.send("done");
      //   db.collection("groups")
      //     .doc(`${id}`)
      //     .collection("messages")
      //     .doc(`${sendmessage.id}`)
      //     .get()
      //     .then((response) => {
      //       const newResponse = response.data();
      //       newResponse.id = response.id;
      //       res.send(newResponse);
      //     })
      //     .catch((err) => {
      //       res.send(err);
      //     });
    })
    .catch((error) => {
      res.send(error);
    });
});

//Delete the message from the firestore
router.delete("/deletemessage/:messageId/:groupId", async (req, res) => {
  const { messageId, groupId } = req.params;
  db.collection("groups")
    .doc(`${groupId}`)
    .collection("messages")
    .doc(`${messageId}`)
    .delete()
    .then(() => {
      res.send("Document Deleted Sucessfully!");
    })
    .catch((err) => {
      res.send(err);
    });
});

//Update the message in the firebase
router.post("/updatemessage", async (req, res) => {
  const {
    messageId,
    id,
    title,
    description,
    tag,
    fileName,
    fileUrl,
    time,
    postedBy,
    postedByEmail,
    userImage,
  } = req.body;

  await db
    .collection("groups")
    .doc(`${id}`)
    .collection("messages")
    .doc(`${messageId}`)
    .update({
      title,
      description,
      tag,
      fileName,
      time,
      postedBy,
      postedByEmail,
      userImage,
      fileUrl,
    })
    .then((sendmessage) => {
      db.collection("groups")
        .doc(`${id}`)
        .collection("messages")
        .doc(`${messageId}`)
        .get()
        .then((response) => {
          const newResponse = response.data();
          newResponse.id = response.id;

          res.send(newResponse);
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .catch((error) => {
      res.send(error);
    });
});

//Get the value of the message to be updated
router.get("/getupdatemessage", async (req, res) => {
  const { groupId, messageId } = req.body;
  await db
    .collection("groups")
    .doc(`${groupId}`)
    .collection("messages")
    .doc(`${messageId}`)
    .get()
    .then((response) => {
      const messageToUpdate = response.data();
      messageToUpdate.id = response.id;
      res.send(messageToUpdate);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
