const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
// const bodyParser = require("body-parser");
const PORT = process.env.PORT || 9000;
require("dotenv").config();
const MongodbUrl = process.env.DATABASE_URL;

//Pusher config

//This are middleware

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.use("/", require("./Routes/routes"));
app.use("/", require("./Routes/users"));
app.use("/", require("./Routes/auth"));
app.use("/", require("./Routes/mockapi"));
app.use("/", require("./Routes/google"));
app.use("/", require("./Routes/deleteGroup"));
app.use("/", require("./Routes/Forgotpassword"));
app.use("/", require("./Routes/Resetpassword"));
app.use("/", require("./Routes/addMemebr"));
app.use("/", require("./Routes/addFriend"));
app.use("/", require("./Routes/allUsers"));
app.use("/", require("./Routes/addMember"));
app.use("/", require("./Routes/addMessage"));
app.use("/", require("./Routes/getUser"));
app.use("/", require("./Routes/message"));
app.use("/", require("./Routes/todo"));

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

//Listning to the ports
app.listen(PORT, () => {
  console.log(`App connected to the port ${PORT}`);
});
