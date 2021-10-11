const express = require("express");
const router = express.Router();
const User = require("../Model/users");

//Send friend request
router.post("/sendrequest", (req, res) => {
  const { userEmail, friendId } = req.body;

  User.findByIdAndUpdate(
    friendId,
    {
      $push: { followRequest: userEmail },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      res.status(422).json("Something went wrong!");
    } else {
    }
    res.status(200).json(result);
  });
});

//Show request
// router.post("/showrequest", (req, res) => {
//   const { showId } = req.body;
//   User.findById(showId)
//     .then((user) => {
//       res.status(200).json(user);
//     })
//     .catch((err) => {
//       res.status(422).json(err);
//     });
// });

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
