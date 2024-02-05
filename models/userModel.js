const connection = require("../config/dbConnection");

class User {
    constructor(userId, firstName, lastName, username, email, password) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    static createUser(user, callback) {
        connection.query(
            "INSERT INTO user (firstName, lastName, username, email, password) VALUES (?, ?, ?, ?, ?)",
            [
                user.firstName,
                user.lastName,
                user.username,
                user.email,
                user.password,
            ],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                callback(null, results);
            }
        );
    }
}

module.exports = User;
