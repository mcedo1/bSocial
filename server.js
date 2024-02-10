const express = require("express");
const dotenv = require("dotenv").config();
const { Kafka, Partitioners, logLevel } = require("kafkajs");
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });
const cors = require("cors");
const connection = require("./config/dbConnection");

const kafka = new Kafka({
    clientId: "user-service",
    logLevel: logLevel.NOTHING,
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

const consumer = kafka.consumer({ groupId: "milos-group" });

//Websocket connection
let arr = [];
wss.on("connection", async function connection(ws) {
    console.log("Web socket connection");
    arr.push(ws);
});

console.log("Client connected");
const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  });
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/follow", require("./routes/followRoutes"));

app.listen(port, () => {
    console.log("Server listening on port ", port);
});

async function runKafkaConsumer() {
    try {
        await consumer.connect();
        await consumer.subscribe({
            topics: ["topic_comment"],
            fromBeginning: true,
        });
        console.log("Connected to Kafka");
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    
                    const parsedMessage = JSON.parse(
                        message.value.toString("utf8")
                        );
                    
                    const  postId=parsedMessage.postId;
                     
                    const userInfo=await getUserInfoPostId(postId);
                    userInfo.commenter=parsedMessage.senderUsername;
                    userInfo.commentContent=parsedMessage.commentContent;
                    
                    
                    
                    const userInfoJson=JSON.stringify(userInfo);
                    
                    arr.forEach((ws) =>
                        ws.send(userInfoJson)
                    );

                    console.log("Received message:", parsedMessage);
                } catch (error) {
                    console.log(error);
                }
            },
        });
    } catch (err) {
        console.error("Error connecting to Kafka:", error);
    }
}

runKafkaConsumer();



async function getUserInfoPostId(postId) {
    try {
        const query = `SELECT p.userId,u.username,u.email,p.content FROM post p, user u WHERE p.userId=u.userId AND postId=?`;
        
        return new Promise((resolve, reject) => {
            connection.query(query, [postId], (err, rows) => {
                if (err) {
                    console.error("Error while executing query:", err);
                    reject(err);
                    return;
                }
                
                if (rows.length > 0) {
                    const userInfo = {
                        userId: rows[0].userId,
                        username: rows[0].username,
                        email: rows[0].email,
                        postContent:rows[0].content,
                        commenter:' ',
                        commentContent: ' '
                    };
                    console.log("User info:", userInfo);
                    resolve(userInfo);
                } else {
                    console.log("User not found for postId:", postId);
                    resolve(null);
                }
            });
        });
    } catch (e) {
        console.error("Error in getUserInfoPostId:", e);
        throw e;
    }
}






