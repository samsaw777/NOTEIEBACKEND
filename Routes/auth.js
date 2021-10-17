const express = require("express");
const router = express.Router();
require("dotenv").config();
const User = require("../Model/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../Middleware/auth");
const db = require("../firebase");
//post the message to valid the user
//this is to signin the user into the system
router.post("/signin", async (req, res) => {
  // const { email, password } = req.body;
  // if (!email || !password)
  //   return res.status(400).send({ msg: "please enter the fields " });
  const { email, password } = req.body;
  await db
    .collection("users")
    .where("email", "==", email)
    .get()
    .then((users) => {
      if (users.docs.length == 0)
        return res.status(400).send({ msg: "User does not exits!" });
      users.docs.map((user) => {
        const newUser = user.data();

        bcrypt.compare(password, newUser.password).then((boolean) => {
          if (!boolean)
            return res.status(400).send({ msg: "Incorrect password!" });
          jwt.sign(
            { id: user.id },
            process.env.JWT_TOKEN,
            { expiresIn: 86400 },
            (err, token) => {
              if (err) return res.json({ msg: err.message });
              res.json({
                token: token,
                user: {
                  id: user.id,
                  name: newUser.name,
                  email: newUser.email,
                  image: newUser.image,
                },
              });
            }
          );
        });
      });
      //Validating the password
    });
});

//get the loggined in user

router.get("/loguser", auth, (req, res) => {
  // console.log(req);

  db.collection("users")
    .doc(`${req.user.id}`)
    .get()
    .then((user) => {
      const User = user.data();
      User.id = user.id;
      res.send(User);
    })
    .catch((err) => res.send(err));
});

router.get("/logusergroups", auth, async (req, res) => {
  // const { user } = req.body;
  console.log(req.user.id);
  const allGroups = [];
  await db
    .collection("users")
    .doc(`${req.user.id}`)
    .collection("groupsjoined")
    .get()
    .then((groups) => {
      groups.docs.map((group) => {
        const groupsDetail = group.data();
        groupsDetail.id = group.id;
        allGroups.push(groupsDetail);
      });
      res.send(allGroups);
    });
});

module.exports = router;
