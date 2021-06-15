const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 9000;
require("dotenv").config();
const MongodbUrl = process.env.DATABASE_URL;

//This are middleware

app.use(cors());
app.use(express.json());
app.use("/", require("./Routes/routes"));
app.use("/", require("./Routes/users"));
app.use("/", require("./Routes/auth"));

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
