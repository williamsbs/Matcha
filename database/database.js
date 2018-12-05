const mysql = require('mysql');

const portSQL = 3306;
const hostSQL = "127.0.0.1";
const connection = mysql.createPool({
    host: hostSQL,
    port: portSQL,
    user: "root",
    password: "123456",
    database: "Matcha",
    connectionLimit: 10,
    getConnection: 0,
    acquireTimeout: 10000
});

module.exports = connection;