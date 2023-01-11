const express = require("express")
const bodyParser = require("body-parser")                 
const env = require("dotenv").config()
const  route  = require("./src/routes/route")
const { dbConnection } = require("./src/database/db")

const url = process.env.dbConnection
const port = process.env.port

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


dbConnection(url)

app.use("/",route)




app.listen(port||3000,()=>{
    console.log("server start");
})