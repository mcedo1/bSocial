const Post=require('../models/postModel');
const connection=require('../config/dbConnection');
const { Kafka,Partitioners } = require('kafkajs');



// Kreiramo Kafka producenta sa odgovarajućom konfiguracijom
const kafka = new Kafka({
    clientId: 'user-service',
    brokers: ['pkc-4r087.us-west2.gcp.confluent.cloud:9092'], 
    ssl: true,
    sasl: {
      mechanism: 'plain',
      username: 'J5Z224QZSXCMZDW4', 
      password: 'w9drey8M7aJ+OSIP/5KTceRGPFPO5yQcJ6lvhiOmeyxqdVHx3rsSTiU1Fmx9fpjZ' 
  },
  createPartitioner: Partitioners.LegacyPartitioner 
  });
  
  const producer = kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner
    });
  
  //funkc za slanje poruke Kafci
  async function sendPostMessage(post) {
    try {
      await producer.connect(); //povezivanje na kafka cluster
      console.log("Uspjesno smo se povezali na klaster!")
  
      const topic = 'topic_post'; 
  
        const userInfo=await getUserInfo(post.userId);
        

  //poruka koja se salje 
      const message = {
        username:userInfo.username,
        email:userInfo.email,
        userId:userInfo.userId,
        timestamp:post.timestamp,
        postId:post.postId,
        messageContent:post.content
      };
  
      //slanje poruke u izvjesnu temu 
      await producer.send({
        topic:topic,
        messages: [{value: JSON.stringify(message)}]
      });
    
      console.log('Post information message sent to Kafka.');
  
      
      await producer.disconnect();
    } catch (error) {
      console.error('Error sending user registration message to Kafka:', error);
    }
  }
  


async function getUserInfo(userId){
    return new Promise((resolve,reject)=>{

    const sql='SELECT * FROM user WHERE userId=?';

    connection.query(sql,[userId],(err,result)=>{
        if(err){
            reject(err);
        }else{
            if(result.length>0){
                const user=result[0];
                resolve({
                    userId:user.userId,
                    username:user.username,
                    email:user.email
                });
            }else{
                reject(err);
            }
        }


    });
})
}




const createPost=async(req,res)=>{

    const userId=req.params.userId;
    const {content}=req.body;

    const newPost=new Post(
        0,
        userId,
        content
    );

    Post.createPost(newPost)
    .then(async response=>{
        newPost.postId = response[0].postId;
        newPost.timestamp = response[0].timestamp;
    //    console.log(newPost)
        await sendPostMessage(newPost)
        return res.status(200).send(`Post created`)
    }).catch(err=>{
        console.log("Error tokom cuvanja posta:\n",err)
        return res.status(-1900).send("Error creating post");
    })
};


const getAllPosts=async(req,res)=>{

    const userId=req.params.userId;

    const sql=`SELECT p.postId,p.content, p.userId
    FROM post p
    WHERE p.userId = ? OR p.userId IN (
        SELECT f.followeeId
        FROM follow f
        WHERE f.followerId = ?
    );`;
    connection.query(sql,[userId,userId],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).send("Error while loading posts")
        }else{
            
            return res.status(200).send(result);
        }

    })

};

















module.exports={createPost,
    getAllPosts,
};


























