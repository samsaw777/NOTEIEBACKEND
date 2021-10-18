const express = require("express");
const router = express.Router();
const User = require("../Model/users");
const crypto = require("crypto");
require("dotenv").config();
const nodeMailer = require("nodemailer");
const db = require("../firebase");
// const sendGridTransporter = require("nodemailer-sendgrid-transport");

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: { user: "remotefirstworktracker@gmail.com", pass: "remote1234" },
});

//creating route to send the link to the user email
router.post("/resetp", async (req, res) => {
  const { email } = req.body;

  if (email === "") {
    return res.json({ message: "Email cannot be empty" });
  }
  await db
    .collection("users")
    .where("email", "==", email)
    .get()
    .then((users) => {
      // res.send(`${users.docs.length}`);
      if (users.docs.length == 0) {
        res.status(400).send("No user with this email found");
      }
      users.docs.map((user) => {
        const User = user.data();
        // console.log(User.email);

        const token = crypto.randomBytes(20).toString("hex");
        User.resetPasswordToken = token;
        User.id = user.id;
        User.tokenExpries = Date.now() + 3600000;
        db.collection("users")
          .doc(`${User.id}`)
          .update({
            email: User.email,
            image: User.image,
            name: User.name,
            password: User.password,
            resetPasswordToken: User.resetPasswordToken,
            tokenExpries: User.tokenExpries,
          })
          .then((response) => {
            transporter.sendMail(
              {
                to: User.email,
                from: "remotefirstworktracker@gmail.com",
                subject: "Reset Password",
                html: `<p>This mail is send to change ${User.name} password.</p> <h4>Click this <a href="https://remoteworktracker.netlify.app/reset/${token}">Link</a> to change this password.</h4>`,
              },
              (err, response) => {
                if (err) {
                  res.send(err);
                } else {
                  res.send({ msg: "Check you message" });
                }
              }
            );
          })
          .catch((err) => {
            res.send(err);
          });
      });
      // }
    });
});

module.exports = router;
