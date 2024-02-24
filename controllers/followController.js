const connection = require("../config/dbConnection");
const Follow = require("../models/followeModel");

async function checkUserId(userId) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM user  WHERE userId=?";
        connection.query(sql, [userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.length > 0);
            }
        });
    });
}

const createFollow = async (req, res) => {
    const followerId = req.params.followerId;
    const { followeeId } = req.body;

    const userExists = await checkUserId(followerId);
    if (!userExists) {
        console.log(userExists);
        return res.status(400).send("User not found in database");
    }

    const newFollow = new Follow(followerId, followeeId);

    Follow.createFollow(newFollow)
        .then((response) => {
            return res.status(200).send(`Follow  created`);
        })
        .catch((err) => {
            return res
                .status(400)
                .send("We got an error while creating the follow");
        });
};

const getFollowees = async (req, res) => {
    const followerId = req.params.followerId;

    console.log('Ovo je reqk:',req)
    const userExists = await checkUserId(followerId);
    if (!userExists) {
        console.log(userExists);
        return res.status(400).send("User not found in database");
    }

    const sql = `SELECT f.followeeId,u.username,u.photoUrl  
    FROM follow f  
    JOIN user u ON f.followeeId=u.userId  WHERE f.followerId=?`;

    connection.query(sql, [followerId], (error, result) => {
        if (error) {
            return res.status(500).send("An error  just occured");
        } else {
            return res.status(200).send(result);
        }
    });
};

const getNoFollowees = async (req, res) => {
    const followerId = req.params.followerId;

    const userExists = await checkUserId(followerId);
    if (!userExists) {
        console.log(userExists);
        return res.status(400).send("User not found in database");
    }

    const sql = `SELECT username,userId,photoUrl FROM user WHERE userId!=? and userId not in(
        select followeeId from follow where followerId=?);`;

    connection.query(sql, [followerId, followerId], (error, result) => {
        if (error) {
            return res.status(500).send("An error  just occured");
        } else {
            return res.status(200).send(result);
        }
    });
};

module.exports = {
    createFollow,
    getFollowees,
    getNoFollowees,
};
