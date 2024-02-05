const Post = require("../models/postModel");
const connection = require("../config/dbConnection");
const { Kafka, Partitioners } = require("kafkajs");

const kafka = new Kafka({
    clientId: "user-service",
    brokers: ["pkc-4r087.us-west2.gcp.confluent.cloud:9092"],
    ssl: true,
    sasl: {
        mechanism: "plain",
        username: "J5Z224QZSXCMZDW4",
        password:
            "w9drey8M7aJ+OSIP/5KTceRGPFPO5yQcJ6lvhiOmeyxqdVHx3rsSTiU1Fmx9fpjZ",
    },
    createPartitioner: Partitioners.LegacyPartitioner,
});

const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
});

async function sendPostMessage(post) {
    try {
        await producer.connect();
        console.log("Successfully connected on cluster!");

        const topic = "topic_post";

        const userInfo = await getUserInfo(post.userId);

        const message = {
            username: userInfo.username,
            email: userInfo.email,
            userId: userInfo.userId,
            timestamp: post.timestamp,
            postId: post.postId,
            messageContent: post.content,
        };

        await producer.send({
            topic: topic,
            messages: [{ value: JSON.stringify(message) }],
        });

        console.log("Post information message sent to Kafka.");

        await producer.disconnect();
    } catch (error) {
        console.error(
            "Error sending user registration message to Kafka:",
            error
        );
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

const createPost = async (req, res) => {
    const userId = req.params.userId;
    const { content } = req.body;

    const newPost = new Post(0, userId, content);

    Post.createPost(newPost)
        .then(async (response) => {
            newPost.postId = response[0].postId;
            newPost.timestamp = response[0].timestamp;
            await sendPostMessage(newPost);
            return res.status(200).json({ message: "Post created" });
        })
        .catch((err) => {
            return res.status(400).send("Error occured while  creating post");
        });
};

const getAllPosts = async (req, res) => {
    const userId = req.params.userId;

    const sql = `SELECT p.postId,p.content, p.userId,p.timestamp, usr.username
    FROM post p, user usr
    WHERE usr.userId=p.userId and (p.userId = ? OR p.userId IN (
        SELECT f.followeeId
        FROM follow f
        WHERE f.followerId = ?));`;

    connection.query(sql, [userId, userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).send("Error while loading posts");
        } else {
            return res.status(200).send(result);
        }
    });
};

module.exports = { createPost, getAllPosts };
