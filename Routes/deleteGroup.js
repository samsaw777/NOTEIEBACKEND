const express = require("express");
const router = express.Router();
require("dotenv").config();
const Feed = require("../Model/model");
const db = require("../firebase");
//delete the group from the group database
router.delete("/deletegroup/:id", (req, res) => {
  const { id } = req.params;
  db.collection("groups")
    .doc(`${id}`)
    .delete()
    .then(() => {
      res.send("Sucessfully Deleted!");
    })
    .catch((err) => {
      res.send("Error deleting group!");
    });
});

module.exports = router;
