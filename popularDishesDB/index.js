const mysql = require('mysql');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        database: 'PopularDishesList'
    }
);


connection.connect(() => {
    console.log('Connected to the root at PopularDishesList Database')
})


module.exports = connection;