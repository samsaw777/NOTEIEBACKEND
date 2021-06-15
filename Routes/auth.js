const express = require("express");
const router = express.Router();
require("dotenv").config();
const User = require("../Model/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../Middleware/auth");

//post the message to valid the user

router.post("/auth", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.json({ msg: "please enter the fields " });

  User.findOne({ email }).then((user) => {
    if (!user) return res.json({ msg: "User does not exits!" });

    //Validating the password
    bcrypt.compare(password, user.password).then((boolean) => {
      if (!boolean) return res.json({ msg: "Incorrect password!" });

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
    });
  });
});

//get the loggined in user

router.get("/loguser", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
