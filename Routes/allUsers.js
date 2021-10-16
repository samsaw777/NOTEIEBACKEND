const express = require("express");
const router = express.Router();
const User = require("../Model/users");
const db = require("../firebase");
//get all the user from the database
router.get("/allusers", (req, res) => {
  const allUsers = [];
  db.collection("users")
    .get()
    .then((users) => {
      users.docs.map((user) => {
        const userinfo = user.data();
        delete userinfo.password;
        userinfo.id = user.id;
        allUsers.push(userinfo);
      });
      res.send(allUsers);
    });
});

module.exports = router;
