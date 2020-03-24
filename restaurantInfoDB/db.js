var mysql      = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database : 'restaurantinfo'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution',(error) => {
  if (error) { 
     console.log(error);
  } else {
    console.log('connected to the database');
  }
});

module.exports = connection;