const express = require("express");
const router = express.Router();
const User = require("../Model/users");

router.get("/getuser", (req, res) => {
  console.log(req.user);
  User.findById({ _id: req.user })
    .populate("followRequestSent", "_id email name")
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      error;
    });
});

module.exports = router;
