const express = require("express");
const router = express.Router();
const User = require("../Model/users");
const crypto = require("crypto");
require("dotenv").config();
const nodeMailer = require("nodemailer");
const sendGridTransporter = require("nodemailer-sendgrid-transport");

const transporter = nodeMailer.createTransport(
  sendGridTransporter({
    auth: {
      api_key: process.env.NODEMAILER_KEY,
    },
  })
);

//creating route to send the link to the user email
router.post("/resetp", async (req, res) => {
  const { email } = req.body;

  if (email === "") {
    return res.json({ message: "Email cannot be empty" });
  }
  await User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.json({ message: "No user with this email found" });
    }
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.tokenExpries = Date.now() + 3600000;
    user.save().then((response) => {
      transporter.sendMail({
        to: user.email,
        from: "sameepsawant10@gmail.com",
        subject: "Reset Password",
        html: `<p>This mail is send to change ${user.name} password.</p> <h4>Click this <a href="https://remoteworktracker.netlify.app/reset/${token}">Link</a> to change this password.</h4>`,
      });
      res.json({ msg: "Check you message" });
    });
  });
});

module.exports = router;
