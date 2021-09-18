const express = require("express");
const router = express.Router();
const User = require("../Model/users");
const bcrypt = require("bcryptjs");
//update the password for the account
router.post("/resetpassword", (req, res) => {
  const { password, token } = req.body;
  User.findOne({
    resetPasswordToken: token,
    tokenExpries: { $gt: Date.now() },
  }).then((user) => {
    if (!user) {
      res.status(403).json({ message: "Session Expired" });
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        res.send({ msg: err.message });
      } else {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            res.send({ msg: err.message });
          } else {
            user.password = hash;
            user.resetPasswordToken = undefined;
            user.tokenExpries = undefined;
            user
              .save()
              .then((savedpassword) => {
                res.status(200).json({ message: `Password Changed!` });
              })
              .catch((err) => {
                res.status(401).json({ message: err.message });
              });
          }
        });
      }
    });
  });
});

module.exports = router;
