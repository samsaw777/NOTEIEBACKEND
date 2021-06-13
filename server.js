const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const feedroute = require("./Routes/routes");
const PORT = process.env.PORT || 9000;
const MongodbUrl = `mongodb+srv://samsaw:${process.env.DATABASE_PASS}@cluster0.dousy.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

//This is middleware
app.use(cors());
app.use(express.json());
app.use("/", feedroute);


//Connecting to the database
(async()=>{
    try{
        await mongoose.connect(MongodbUrl,
        {useNewUrlParser: true, useUnifiedTopology: true},
        ()=>{
            console.log('Connected to database');
        });
    }catch(err){
        console.log(`Error connecting to database,${err}`)
    }
})()

//Listning to the ports
app.listen(PORT, () => {
  console.log(`App connected to the port ${PORT}`);
});
