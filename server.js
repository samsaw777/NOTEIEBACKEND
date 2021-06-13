const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const feedroute =  require('./Routes/routes')
const PORT = process.env.PORT || 9000


//This is middleware
app.use(cors())
app.use(express.json())
app.use('/',feedroute)





//Listning to the ports
app.listen(PORT,()=>{
    console.log(`App connected to the port ${PORT}`)
})
