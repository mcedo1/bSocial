const express=require('express');
const dotenv=require("dotenv").config();
const http=require('http');
const WebSocket=require('ws');
const secretFile=require('./config/secretFile');
const jwt=require('jsonwebtoken');




const connection=require('./config/dbConnection');
const { decode } = require('punycode');



const app=express();
const port=process.env.PORT || 3000;


app.use(express.json());


app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/posts',require('./routes/postRoutes'));
app.use('/api/comments',require('./routes/commentRoutes'));
app.use('/api/follow',require('./routes/followRoutes'))

const server=http.createServer(app);

const wsServer=new WebSocket.Server({server});

async function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretFile, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}
wsServer.on('connection', async (ws, req) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            const token = authHeader.split(" ")[1];
            const decoded = await verifyToken(token); // Verifikacija JWT tokena
            const user = decoded.user; // Izdvajanje informacija o korisniku iz dekodiranog tokena
            ws.userId = user.userId; // Postavljanje userId atributa za WebSocket konekciju
        } catch (error) {
            console.error("An error occurred while verifying user:", error);
            ws.close(); // Zatvaranje WebSocket konekcije u slučaju greške
        }
    }
});












app.listen(port,()=>{
    console.log('Server listening on port ', port);
})













