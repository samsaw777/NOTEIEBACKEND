const express = require("express");
const router = express.Router();
require("dotenv").config();
const Feed = require("../Model/model");

//delete the group from the group database
router.delete("/deletegroup", (req, res) => {
  const { id } = req.body;
  Feed.findByIdAndDelete(id, (error, response) => {
    if (error) {
      res.status(400).send("Error while deleting the records!");
    } else {
      res.status(200).send("Successfully deleted the group!");
    }
  });
});

module.exports = router;
