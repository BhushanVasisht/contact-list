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
app.use(morgan('dev'))
app.use(bodyParser.json())

//setup server paths
app.get('/all', (req,res) => {
    //return getH.getAllData(res)
    return res.json({
        headers: ['First Name', 'Middle Name', 'Last Name', 'Address List', 'Phone List', 'Date List'],
        data: [{key: 1, fname:'Tom', mname:'', lname:'Jackson', phone: [{phone_type: 'Office', area_code : '555', number: '444-333'}, {phone_type: 'Mobile', area_code: '682', number: '433-1097'}], dates: [{date_type: 'Birthday', date: '1995-07-12' }, {date_type: 'Deadline', date: '2020-08-10'}], address : [{address_type: 'Office', street : '800 W Campbell Road',  city: 'Richardson', state: 'Texas', zip: 75080}, {address_type:'Home', street: '800 W Renner Road',  city:'Dallas', state: 'Texas', zip: 75080}]}]
    })
})

app.get('/contact', (req, res) => {
    return getH.getContactEntry(req,res)
})

app.post('/updateContact', (req, res) => {
    console.log(req.body)
})

//start listening to requests
app.listen(process.env.BASE_PORT, () => console.log("listening on port: " + process.env.BASE_PORT))
