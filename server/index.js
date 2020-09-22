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
        data: [
            {key: 1, name: {first:'Tom', middle:'', last:'Jackson'}, phone: [{type: 'Office', num : '555-444-333'}], dates: [{type: 'Birthday', date: '12/07/1995'}], address : [{type: 'Office', add : '800 W Campbell Road, Richardson, Texas-75080'}, {type:'Home', add: '800 W Renner Road, Dallas, Texas-75080'}]},
            {key: 2, name: {first:'Mike', middle:'Oliver', last:'James'}, phone: [{type: 'Office', num : '555-444-333'}], dates: [{type: 'Anniversary', date: '12/07/1995'}], address : [{type: 'Office', add : '800 W Renner Road'}, {type:'Home', add: '7575 Frankford Road'}]},
            {key: 3, name: {first:'Janet', middle:'', last:'Larson'}, phone: [{type: 'Office', num : '555-444-333'}], dates: [{type: 'Reopen', date: '12/07/1995'}], address : [{type: 'Office', add : '800 W Renner Road'}, {type:'Home', add: '7575 Frankford Road'}]},
            {key: 4, name: {first:'Clark', middle:'', last:'Thompson'}, phone: [{type: 'Office', num : '555-444-333'}], dates: [{type: 'Wedding', date: '12/07/1995'}], address : [{type: 'Office', add : '800 W Renner Road'}, {type:'Home', add: '7575 Frankford Road'}]},
            {key: 5, name: {first:'Emma', middle:'', last:'Page'}, phone: [{type: 'Office', num : '555-444-333'}], dates: [{type: 'Birthday', date: '12/07/1995'}], address : [{type: 'Office', add : '800 W Renner Road'}, {type:'Home', add: '7575 Frankford Road'}]},
            {key: 6, name: 'Emily Thompson', phone: [{type: 'Office', num : '555-444-333'}], dates: [{type: 'Birthday', date: '12/07/1995'}], address : [{type: 'Office', add : '800 W Renner Road'}, {type:'Home', add: '7575 Frankford Road'}]},
            {key: 7, name: 'Aditya Pandhare', phone: [{type: 'Office', num : '555-444-333'}], dates: [{type: 'Birthday', date: '12/07/1995'}], address : [{type: 'Office', add : '800 W Renner Road'}, {type:'Home', add: '7575 Frankford Road'}]},
            {key: 8, name: {first:'Loos', middle:'Mada', last:'Yogi'}, phone: [{type: 'Office', num : '555-444-333'}], dates: [{type: 'Reopen', date: '12/07/1995'}], address : [{type: 'Office', add : '800 W Renner Road'}, {type:'Home', add: '7575 Frankford Road'}]}
        ]})
})

app.get('/contact', (req, res) => {
    return getH.getContactEntry(req,res)
})

app.post('/updateContact', (req, res) => {
    console.log(req.body)
})

//start listening to requests
app.listen(process.env.BASE_PORT, () => console.log("listening on port: " + process.env.BASE_PORT))
