const express = require("express");
const router = express.Router();
const User = require("../Model/users");

//get all the user from the database
router.get("/allusers", (req, res) => {
  User.find({})
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

module.exports = router;
