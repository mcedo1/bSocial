const mysql = require("mysql");
// const mysql2 = require("mysql2");

//For Docker-compose testing use:mysql2 where host:mysql
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bdata",
    port: "3307",
});

connection.connect((err) => {
    if (err) {
        console.log("Error occured while connecting to database", err);
        throw err;
    }
    console.log("Connection established!");
});

module.exports = connection;
