const connection = require("../config/dbConnection");
const Comment = require("../models/commnetModel");
const { Kafka, Partitioners, logLevel } = require("kafkajs");

// Creating kafka producer and establishing connection
const kafka = new Kafka({
    clientId: "user-service",
    logLevel: logLevel.INFO,
    brokers: ["pkc-4r087.us-west2.gcp.confluent.cloud:9092"],
    ssl: true,
    sasl: {
        mechanism: "plain",
        username: "IWDHIGVY55D7ZDBV",
        password:
            "bY3OiXzHc+EWlNhFmDn7TogDG2Un3kAiaGGsbg5ZsO+W8v2Kg58e2aU0u6C9YcFk",
    },
    createPartitioner: Partitioners.LegacyPartitioner,
});

const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
});

async function sendCommentMessage(comment) {
    const topic = "topic_comment";
    try {
        await producer.connect();
        console.log("Successfully connected on cluster!");

        const userInfo = await getUserInfo(comment.userId);

        const message = {
            senderUsername: userInfo.username,
            senderEmail: userInfo.email,
            senderId: userInfo.userId,
            timestamp: comment.timestamp,
            postId: comment.postId,
            commentId: comment.commentId,
            commentContent: comment.content,
        };

        await producer.send({
            topic: topic,
            messages: [{ value: JSON.stringify(message) }],
        });

        console.log("Comment information message sent to Kafka.");
        await producer.disconnect();
    } catch (error) {
        console.error("Error sending comment  message to Kafka:", error);
    }
}

async function getUserInfo(userId) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM user WHERE userId=?";

        connection.query(sql, [userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.length > 0) {
                    const user = result[0];
                    resolve({
                        userId: user.userId,
                        username: user.username,
                        email: user.email,
                    });
                } else {
                    reject(err);
                }
            }
        });
    });
}

const createComment = async (req, res, ws) => {
    const userId = req.params.userId;
    const { postId, content } = req.body;
    const newComment = new Comment(0, postId, userId, content);

    Comment.createComment(newComment)
        .then(async (response) => {
            newComment.commentId = response[0].commentId;
            newComment.timestamp = response[0].timestamp;
            await sendCommentMessage(newComment);
            return res.status(200).json({ message: "Comment  created" });
        })
        .catch((err) => {
            return res.status(400).send("Error while creating comment");
        });
};

const getAllComments = async (req, res) => {
    const postId = req.params.postId;

    const sql =
        `SELECT content, timestamp, user.username, user.userId, commentId, comment.postId ` +
        `FROM comment, user ` +
        `WHERE postId = ? AND comment.userId = user.userId`;

    connection.query(sql, [postId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error while loading comments");
        } else {
            return res.status(200).send(result);
        }
    });
};

module.exports = { createComment, getAllComments };
