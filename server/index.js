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
    return res.json({headers: ['Name', 'Phone', 'Email','Address'], data: [
            {key: 1, name: 'Tom Jackson', phone: '555-444-333', email: 'tom@gmail.com', address : [{type: 'Office', add : '800 W Renner Road'}, {type:'Home', add: '7575 Frankford Road'}]},
            {key: 2, name: 'Mike James', phone: '555-777-888', email: 'mikejames@gmail.com', address : [{type: 'Office', add : '800 W Renner Road'}, {type:'Home', add: '7575 Frankford Road'}]},
            {key: 3, name: 'Janet Larson', phone: '555-222-111', email: 'janetlarson@gmail.com', address : [{type: 'Office', add : '800 W Renner Road'}, {type:'Home', add: '7575 Frankford Road'}]},
            {key: 4, name: 'Clark Thompson', phone: '555-444-333', email: 'clark123@gmail.com', address : [{type: 'Office', add : '800 W Renner Road'}, {type:'Home', add: '7575 Frankford Road'}]},
            {key: 5,name: 'Emma Page', phone: '555-444-333', email: 'emma1page@gmail.com', address : [{type: 'Office', add : '800 W Renner Road'}, {type:'Home', add: '7575 Frankford Road'}]},
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
