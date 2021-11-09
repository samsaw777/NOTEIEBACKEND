const express = require("express");
const router = express.Router();
const User = require("../Model/users");
const db = require("../firebase");
//Send friend request
router.post("/sendrequest", (req, res) => {
  const { userEmail, friendId, image, loginId } = req.body;
  db.collection("users")
    .doc(`${friendId}`)
    .collection("friendRequest")
    .add({
      userEmail,
      image,
      loginId,
    })
    .then(() => {
      res.send("Freind Request sent sucessfully!");
    })
    .catch((error) => {
      res.send("Error sending friend request!");
    });
});

// Show request
router.get("/showrequest/:userId", async (req, res) => {
  const { userId } = req.params;
  const allRequests = [];
  await db
    .collection("users")
    .doc(`${userId}`)
    .collection("friendRequest")
    .get()
    .then((requests) => {
      requests.docs.map((request) => {
        const requestInfo = request.data();
        requestInfo.id = request.id;
        allRequests.push(requestInfo);
      });
      res.send(allRequests);
    })
    .catch((err) => {
      res.send(err);
    });
});

//Show friends list
router.get("/showfriends/:userId", async (req, res) => {
  const { userId } = req.params;
  const allFriends = [];
  await db
    .collection("users")
    .doc(`${userId}`)
    .collection("friends")
    .get()
    .then((friends) => {
      friends.docs.map((friend) => {
        const friendInfo = friend.data();
        friendInfo.id = friend.id;
        allFriends.push(friendInfo);
      });
      res.send(allFriends);
    })
    .catch((err) => {
      res.send(err);
    });
});

//Reject friend request
router.post("/cancelrequest", async (req, res) => {
  const { userId, friendId } = req.body;
  await db
    .collection("users")
    .doc(`${userId}`)
    .collection("friendRequest")
    .doc(`${friendId}`)
    .delete()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

//Add friend using backend
router.post("/addfriend", async (req, res) => {
  const { userId, friendEmail, friendId, friendImage, removeId } = req.body;

  const removeFriendRequest = await db
    .collection("users")
    .doc(`${userId}`)
    .collection("friendRequest")
    .doc(`${removeId}`)
    .delete();

  const addFriend = await db
    .collection("users")
    .doc(`${userId}`)
    .collection("friends")
    .add({
      friendId,
      friendImage,
      friendEmail,
    });

  Promise.all([removeFriendRequest, addFriend]).then((value) => {
    console.log(value);
    res.send(`Friend added`);
  });
});

//remove frined
router.post("/removefriend", (req, res) => {
  const { userId, friendId } = req.body;

  db.collection("users")
    .doc(`${userId}`)
    .collection("friends")
    .doc(`${friendId}`)
    .delete()
    .then(() => {
      res.send("Friend removed");
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
