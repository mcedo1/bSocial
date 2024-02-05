// const mysql = require("mysql");
const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
    host: "mysql",
    user: "root",
    password: "root",
    database: "bdata",
    port: "3306",
});

connection.connect((err) => {
    if (err) {
        console.log("Error occured while connecting to database", err);
        throw err;
    }
    console.log("Connection established!");
});

module.exports = connection;
