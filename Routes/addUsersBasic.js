const express = require("express");
const app = express.Router();
const UserBasic = require("../Model/userBasic");

//add member to the group
app.post("/adduserbasic", async (req, res) => {
  const { userName, userEmail, userAddress } = req.body;

  UserBasic.create(
    {
      name: userName,
      email: userEmail,
      address: userAddress,
    },
    (err, user) => {
      if (err) {
        res.send(err);
      } else {
        console.log(user);
        res.send(user);
      }
    }
  );
});

//get a user
app.get("/getAllUser", (req, res) => {
  UserBasic.find({}, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
});

//find a user
app.get("/findUser/:id", (req, res) => {
  UserBasic.findById(req.params.id, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
});

//Delete a user
app.delete("/deleteUser/:id", (req, res) => {
  UserBasic.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
});

//update a user

app.post("/update/:id", (req, res) => {
  console.log(req.body);
  UserBasic.findById(req.params.id, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      UserBasic.update(req.body, (err, response) => {
        if (err) {
          res.send(err);
        } else {
          res.send(response);
        }
      });
    }
  });
});

module.exports = app;
