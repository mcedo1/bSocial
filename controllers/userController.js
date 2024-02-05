const User = require("../models/userModel");
const connection = require("../config/dbConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretSigned = require("../config/secretFile");
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

async function sendUserRegistrationMessage(user) {
    try {
        await producer.connect();
        console.log("Successfully connected on cluster!");

        const topic = "topic_reg";

        const message = {
            user: user,
            registrationDate: new Date(),
        };

        await producer.send({
            topic: topic,
            messages: [
                {
                    value: JSON.stringify(message),
                },
            ],
        });

        console.log("User registration message sent to Kafka.");

        await producer.disconnect();
    } catch (error) {
        console.error(
            "Error sending user registration message to Kafka:",
            error
        );
    }
}

async function sendUserLoginMessage(user) {
    try {
        await producer.connect();
        console.log("Successfully connected on cluster!");

        const topic = "topic_login";

        const message = {
            user: user,
            registrationDate: new Date(),
        };

        await producer.send({
            topic: topic,
            messages: [
                {
                    value: JSON.stringify(message),
                },
            ],
        });

        console.log("User login message sent to Kafka.");

        await producer.disconnect();
    } catch (error) {
        console.error("Error sending user login message to Kafka:", error);
    }
}

const registerUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            username,
            email,
            password,
            passwordConfm,
        } = req.body;

        const query = `SELECT email FROM user WHERE email=? `;
        connection.query(query, [email], async (error, result) => {
            if (error) {
                res.status(400).json({ message: "An error occured!" });
            }
            if (result.length > 0) {
                console.log("User already exists", result);
                return res
                    .status(401)
                    .json({ message: "User already exists!" });
            }
            if (password != passwordConfm) {
                return res.status(401).json({
                    message: "Password and confirm password doesn't match!",
                });
            }
            const hashPassword = await bcrypt.hash(password, 10);
            console.log(hashPassword);
            const newUser = new User(
                0,
                firstName,
                lastName,
                username,
                email,
                hashPassword
            );

            User.createUser(newUser, async (error, response) => {
                if (error) {
                    res.status(400).json({
                        error: "Error occured while creating user",
                    });
                } else {
                    await sendUserRegistrationMessage(newUser);
                    res.status(200).json({
                        message: "User successfully registrated!",
                    });
                }
            });
        });
    } catch (error) {
        res.status(500).send({ error: "Error occured while saving user:" });
    }
};

const loginUser = async (req, res) => {
    const { identity, password } = req.body;

    const sql = "SELECT * FROM user WHERE email=? OR username=?";

    connection.query(sql, [identity, identity], (error, result) => {
        if (error) return res.status(400).send("An  error occured");
        if (result.length === 0)
            return res.status(400).json({ message: "User not found" });

        const user = result[0];

        const hashedPassword = user.password;

        bcrypt.compare(password, hashedPassword, async (err, isMatch) => {
            if (err) {
                throw err;
            } else {
                if (!isMatch) {
                    return res
                        .status(401)
                        .json({ message: "The password is not correct" });
                } else {
                    const accessToken = jwt.sign(
                        {
                            user: {
                                username: user.username,
                                email: user.email,
                                id: user.id,
                            },
                        },
                        secretSigned,
                        { expiresIn: "55m" }
                    );
                    await sendUserLoginMessage(user);
                    sendData = {
                        key: accessToken,
                        userId: user.userId,
                        email: user.email,
                    };
                    return res.status(200).json(sendData);
                }
            }
        });
    });
};

const currentUser = async (req, res) => {
    res.status(200).send(req.user);
};

module.exports = { registerUser, loginUser, currentUser };
