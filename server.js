const express=require('express');
const dotenv=require("dotenv").config();
const http=require('http');
const { Kafka,Partitioners, logLevel } = require('kafkajs');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const cors=require('cors');



const connection=require('./config/dbConnection');

const kafka = new Kafka({
    clientId: 'user-service',
    logLevel: logLevel.NOTHING,
    brokers: ['pkc-4r087.us-west2.gcp.confluent.cloud:9092'], 
    ssl: true,
    sasl: {
      mechanism: 'plain',
      username: 'J5Z224QZSXCMZDW4', 
      password: 'w9drey8M7aJ+OSIP/5KTceRGPFPO5yQcJ6lvhiOmeyxqdVHx3rsSTiU1Fmx9fpjZ' 
  },
  createPartitioner: Partitioners.LegacyPartitioner 
  });

    const consumer = kafka.consumer({ groupId: 'milos-group' });

let arr = []
    wss.on('connection', async function connection(ws) {
        console.log('connection');
    arr.push(ws)
     
    });


console.log('Client connected');
const app=express();
const port=process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/posts',require('./routes/postRoutes'));
app.use('/api/comments',require('./routes/commentRoutes'));
app.use('/api/follow',require('./routes/followRoutes'))
app.use(cors());

app.listen(port,()=>{
    console.log('Server listening on port ', port);
})



// function runKafkaConsumer(){
//     const consumer = kafka.consumer({ groupId: 'milos-group' });
//     console.log()
//     let ws = appleBasket.getApplesCount()
//     consumer.connect()
//         .then(() => {
//             console.log('Connected to Kafka');
            
//             consumer.subscribe({ topic: 'topic_comment', fromBeginning: true });
//             consumer.run({
//                 eachMessage: async ({ topic, partition, message }) => {
//                     const parsedMessage=JSON.parse(message.value.toString('utf8'));
//                     console.log('Received message:',parsedMessage);
//                     ws.send(message)
//                 },
//             });
//         })
//         .catch((error) => {
//             console.error('Error connecting to Kafka:', error);
//         });
    
//     }

async function runKafkaConsumer() {
    try{
        await consumer.connect();
        await consumer.subscribe({
             topics: ['topic_comment'],
             fromBeginning: true,
        });
        console.log("Connected to Kafka");
        await consumer.run({
             eachMessage: async ({ topic, partition, message }) => {
                try {
                    const parsedMessage = JSON.parse(
                        message.value.toString("utf8")
                   );
                   arr.forEach(ws => ws.send(message.value.toString("utf8")))

                   console.log("Received message:", parsedMessage);  
                } catch (error) {
                    console.log(error)
                } 
             },
        });
    }
    catch (err){
        console.error("Error connecting to Kafka:", error);
    }
}


 runKafkaConsumer()












