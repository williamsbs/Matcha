let mysql = require('mysql');

const portSQL = 3306;
const hostSQL = "localhost";
const connection = mysql.createPool({
    host: hostSQL,
    port: portSQL,
    user: "root",
    password: "123456",
    database: "matcha",
    connectionLimit: 10,
    getConnection: 0,
    acquireTimeout: 10000
});
const init_db = require('./init.js');
init_db.db_init_tables(connection, hostSQL, portSQL);

module.exports = connection;