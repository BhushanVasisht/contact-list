var mysql = require('mysql');

exports.getAllData = (res) => {
    //connection object
    var connection = mysql.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASS,
            database : process.env.DB_NAME,
        });

    //connect to the db instance
    connection.connect()

    //execute the query
    connection.query("SELECT * FROM Contact", (err, result, fields) => {
        if(err)
            throw err

        //close the connection
        connection.end()

        //return the data as a json
        return res.json({data : result})
    })
}

exports.getContactEntry = (req, res) => {
    //connection object
    var connection = mysql.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASS,
            database : process.env.DB_NAME,
        });

    //connect to the db instance
    connection.connect()

    let query = 'SELECT * FROM Contact'

    //execute the query
    connection.query(query, (err, result, fields) => {
        if(err)
            throw err

        //close the connection
        connection.end()

        //return the data as a json
        return res.json({data : result})
    })
}

