"use strict";

function db_init_table_user(conn) {

    const sql = "CREATE TABLE IF NOT EXISTS Users (" +
        "  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT," +
        "  `first_name` VARCHAR(256) NOT NULL," +
        "  `last_name` VARCHAR(256) NOT NULL," +
        "  `username` VARCHAR(254) NOT NULL," +
        "  `email` VARCHAR(254) NOT NULL," +
        "  `password` VARCHAR(255) NOT NULL," +
        "  `cle` VARCHAR(255) NOT NULL," +
        "  `actif` int(1) NOT NULL DEFAULT 0" +
        ") ENGINE = InnoDB;";

    conn.query(sql, function (err) {
        if (err) throw err;
    });
}


function db_init_tables(conn, hostSQL, portSQL) {

    conn.query('SELECT 1', function (err) {
        if (err) throw err;
        console.log("Connected to the server mysql at http://%s:%s !", hostSQL, portSQL);

        db_init_table_user(conn);
    });
}

module.exports = {
    db_init_tables: db_init_tables
};