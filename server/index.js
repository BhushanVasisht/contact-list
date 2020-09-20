const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const getH = require('./data/getH')

//configure environment variables
dotenv.config()

//create an express app
let app = express()

//setup middlewares
app.use(morgan("dev"))
app.use(bodyParser.json())

//setup server paths
app.get('/all', (req,res) => {
    //return getH.getAllData(res)
    return res.json({data: []})
})

app.get('/contact', (req, res) => {
    return getH.getContactEntry(req,res)
})

//start listening to requests
app.listen(process.env.BASE_PORT, ()=> console.log("listening on port: " + process.env.BASE_PORT))
