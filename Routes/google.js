const express = require("express");
const router = express.Router();
require("dotenv").config();
const User = require("../Model/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "400731109120-o34mbbet9ni92eip3p1qog3ef0n64auo.apps.googleusercontent.com"
);
//THis is google sign in router

router.post("/googlelogin", async (req, res) => {
  const { tokenId } = req.body;

  await client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "400731109120-o34mbbet9ni92eip3p1qog3ef0n64auo.apps.googleusercontent.com",
    })
    .then((response) => {
      const { email_verified, email, name, picture } = response.payload;
      if (email_verified) {
        User.findOne({ email }).then((user) => {
          if (user) {
            jwt.sign(
              { id: user.id },
              process.env.JWT_TOKEN,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) return res.json({ msg: err.message });
                res.json({
                  token: token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                  },
                });
              }
            );
          } else {
            const password = email + name;
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
          }
        });
      }
    });
});

module.exports = router;
