const express = require("express");
const router = express.Router();
const User = require("../Model/users");
const db = require("../firebase");
//Send friend request
router.post("/sendrequest", (req, res) => {
  const { userEmail, friendId, image, loginId } = req.body;
  db.collection("users")
    .doc(`${friendId}`)
    .collection("frendRequest")
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
    .collection("frendRequest")
    .get()
    .then((requests) => {
      requests.docs.map((request) => {
        const requestInfo = request.data();
        requestInfo.id = request.id;
        allRequests.push(requestInfo);
      });
      res.send(allRequests);
    });
});

//Reject friend request
router.post("/cancelrequest", (req, res) => {
  const { userEmail, friendId } = req.body;

  User.findByIdAndUpdate(
    friendId,
    {
      $pull: { followRequest: userEmail },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      res.status(422).json("Something went wrong!");
    } else {
      res.status(200).json(result);
    }
  });
});

//Add friend using backend
router.post("/addfriend", (req, res) => {
  const { userId, friendEmail } = req.body;
  console.log(userId);
  User.findByIdAndUpdate(
    userId,
    {
      $push: { friends: friendEmail },
      $pull: { followRequest: friendEmail },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      res.status(422).json("Something went wrong!");
    } else {
      res.status(200).json(result);
    }
  });
});

//remove frined
router.post("/removefriend", (req, res) => {
  const { userId, friendEmail } = req.body;

  User.findByIdAndUpdate(
    userId,
    {
      $pull: { friends: friendEmail },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      res.status(422).json("Something went wrong!");
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
