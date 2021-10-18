const express = require("express");
const router = express.Router();
const User = require("../Model/users");
const bcrypt = require("bcryptjs");
const db = require("../firebase");
//update the password for the account
router.post("/resetpassword", (req, res) => {
  const { password, token } = req.body;
  var ref = db.collection("users");
  ref = ref.where("resetPasswordToken", "==", token);
  ref = ref.where("tokenExpries", ">", Date.now());
  ref.get().then((users) => {
    if (users.docs.length == 0) {
      res.status(403).json({ message: "Session Expired" });
    }
    users.docs.map((user) => {
      const User = user.data();
      bcrypt.hash(password, 10).then((hash) => {
        db.collection("users")
          .doc(`${user.id}`)
          .update({
            email: User.email,
            image: User.image,
            name: User.name,
            password: hash,
            resetPasswordToken: null,
            tokenExpries: null,
          })
          .then((savepasswords) => {
            res.status(200).json({ message: `Password Changed!` });
          })
          .catch((err) => {
            res.status(401).json({ message: err.message });
          });
      });
    });
  });
});

module.exports = router;
