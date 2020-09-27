const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const getH = require('./data/getH')
const postH = require('./data/postH')

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

app.post('/addNew',() => {

})

app.delete('/delete', () => {

})

app.post('/updateContact', (req, res) => {
    console.log(req.body)
})

app.put('/restoreDB', (req, res) => {
    postH.restoreDB(req, res)
})

//start listening to requests
app.listen(process.env.SERVER_BASE_PORT, () => console.log("listening on port: " + process.env.SERVER_BASE_PORT))
