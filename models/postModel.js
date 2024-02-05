const connection = require("../config/dbConnection");

class Post {
    constructor(postId, userId, content, timestamp) {
        this.postId = postId;
        this.userId = userId;
        this.content = content;
        this.timestamp = timestamp;
    }

    static createPost(post) {
        return new Promise((resolve, reject) => {
            connection.query(
                `INSERT INTO post (userId, content) VALUES (?, ?);`,
                [post.userId, post.content],
                (error, results) => {
                    if (error) reject(error);
                    else {
                        connection.query(
                            `SELECT * FROM post  WHERE userId=? ORDER BY timestamp DESC LIMIT 1;`,
                            [post.userId],
                            (error, res) => {
                                if (error) reject(error);
                                else resolve(res);
                            }
                        );
                    }
                }
            );
        });
    }
}

module.exports = Post;
