const express = require("express");
const router = express.Router();
require("dotenv").config();
const User = require("../Model/users");
const db = require("../firebase");
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
        db.collection("users")
          .where("email", "==", email)
          .get()
          .then((users) => {
            if (users.docs.length) {
              users.docs.map((user) => {
                const User = user.data();
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
                        name: User.name,
                        email: User.email,
                        image: User.image,
                      },
                    });
                  }
                );
              });
            } else {
              const password = email + name;

              bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                  res.send({ msg: err.message });
                } else {
                  bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                      res.send({ msg: err.message });
                    } else {
                      const hashedPassword = hash;
                      try {
                        db.collection("users")
                          .add({
                            email: email,
                            name: name,
                            image: picture,
                            password: hashedPassword,
                          })
                          .then((user) => {
                            db.collection("users")
                              .doc(`${user.id}`)
                              .get()
                              .then((nuser) => {
                                const newuser = nuser.data();
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
                                        name: newuser.name,
                                        email: newuser.email,
                                        image: newuser.image,
                                      },
                                    });
                                  }
                                );
                              });
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
