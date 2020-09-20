var mysql = require('mysql');

exports.addNewEntry = (req, res) => {
    //connection object
    var connection = mysql.createConnection(
        {
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASS,
            database : process.env.DB_NAME,
        }
    );

    //connect to the db instance
    connection.connect()

    //execute the query
    //connection.query('INSERT INTO contacts VALUES', [0,23,4,5,6,7]).then(res => connection.end())
}
