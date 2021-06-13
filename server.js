const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
const feedroute = require("./Routes/routes");
const PORT = process.env.PORT || 9000;
const Feed = require("./Model/model");
require("dotenv").config();
const MongodbUrl = `mongodb+srv://samsaw:${process.env.DATABASE_PASS}@cluster0.dousy.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
//This is middleware

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use("/", feedroute);

//Connecting to the database
const connectmongo = async () => {
  await mongoose.connect(
    MongodbUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    () => {
      console.log("Connected to database");
    }
  );
};
connectmongo();

// app.post("/sendusers", (req, res) => {
//   const message = req.body;
//   Feed.create(message, (err, data) => {
//     if (err) {
//       res.status(500).send(err.message);
//     } else {
//       res.status(201).send(`New Message create: \n ${data}`);
//     }
//   });
// });

//Listning to the ports
app.listen(PORT, () => {
  console.log(`App connected to the port ${PORT}`);
});
