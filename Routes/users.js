const express = require("express");
const router = express.Router();
require("dotenv").config();
const User = require("../Model/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//post the user and check the user
router.post("/sign", (req, res) => {
  //request the data from the client
  const { name, email, password } = req.body;

  //Check of anything is empty
  if (!name || !email || !password) {
    return res.status(400).send({
      msg: "Enter all the fileds!",
    });
  }

  //Check if there is a user by same email registered
  User.findOne({ email }).then((user) => {
    if (user)
      return res.status(200).send({
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
                    expiresIn: 3600,
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

module.exports = router;
