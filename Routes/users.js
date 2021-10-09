const express = require("express");
const router = express.Router();
require("dotenv").config();
const User = require("../Model/users");
const Group = require("../Model/model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//this is a sign up route created
//post the user and check the user
router.post("/signup", async (req, res) => {
  //request the data from the client
  const { name, email, password } = req.body;

  //Check of anything is empty
  if (!name && !email && !password) {
    return res.status(400).send({
      msg: "Enter all the fileds!",
    });
  } else if (!name) {
    return res.status(400).send({
      msg: "No name",
    });
  } else if (!email) {
    return res.status(400).send({
      msg: "No email",
    });
  } else if (!password) {
    return res.status(400).send({
      msg: "No password",
    });
  }

  //Check if there is a user by same email registered
  await User.findOne({ email }).then((user) => {
    if (user)
      return res.status(400).send({
        msg: "User email already registered",
      });

    const userdata = new User({
      name,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        res.send({ msg: err.message });
      } else {
        bcrypt.hash(userdata.password, salt, (err, hash) => {
          if (err) {
            res.send({ msg: err.message });
          } else {
            userdata.password = hash;
            try {
              userdata.save().then((user) => {
                jwt.sign(
                  {
                    id: user.id,
                  },
                  process.env.JWT_TOKEN,
                  {
                    expiresIn: 86400,
                  },
                  (err, token) => {
                    if (err) {
                      res.json({ msg: err.message });
                    }
                    res.send({
                      token: token,
                      user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                      },
                    });
                  }
                );
              });
            } catch (err) {
              res.json({
                msg: err.message,
              });
            }
          }
        });
      }
    });
  });
});

//
module.exports = router;
