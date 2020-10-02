const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const getH = require('./data/getH')
const postH = require('./data/postH')
const putH = require('./data/putH')

//configure environment variables
dotenv.config()

//create an express app
let app = express()

//setup middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())

//setup server paths
app.get('/all', (req,res) => {
    return getH.getAllData(res)
})

app.get('/contact', (req, res) => {
    return getH.getContactEntry(req,res)
})

app.post('/addNew',(req, res) => {
    return postH.updateDB(req, res)
})

app.put('/delete', (req,res) => {
    return putH.deleteEntry(req, res)
})

app.put('/restoreDB', (req, res) => {
    return putH.restoreDB(req, res)
})

//start listening to requests
app.listen(process.env.SERVER_BASE_PORT, () => console.log("listening on port: " + process.env.SERVER_BASE_PORT))
