const connection=require('../config/dbConnection');
const Comment = require('../models/commnetModel');
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
  async function sendCommentMessage(comment) {
    try {
      await producer.connect(); //povezivanje na kafka cluster
      console.log("Uspjesno smo se povezali na klaster!")
  
      const topic = 'topic_comment'; 
  
        const userInfo=await getUserInfo(comment.userId);
        

  //poruka koja se salje 
      const message = {
        senderUsername:userInfo.username,
        senderEmail:userInfo.email,
        senderId:userInfo.userId,
        timestamp:comment.timestamp,
        postId:comment.postId,
        commentId:comment.commentId,
        commentContent:comment.content
      };
  
      //slanje poruke u izvjesnu temu 
      await producer.send({
        topic:topic,
        messages: [{value: JSON.stringify(message)}]
      });
    
      console.log('Comment information message sent to Kafka.');
  
      
      await producer.disconnect();
    } catch (error) {
      console.error('Error sending comment  message to Kafka:', error);
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













const createComment=async(req,res)=>{

    const userId=req.params.userId;
    const {postId,content}=req.body;

        const newComment=new Comment(
            0,
            postId,
            userId,
            content
        );



        Comment.createComment(newComment)
        .then(async response=>{
            newComment.commentId=response[0].commentId;
            newComment.timestamp=response[0].timestamp;
            await sendCommentMessage(newComment);
            return res.status(200).send(`Comment  created`)
        }).catch(err=>{
            console.log("Error tokom cuvanja komentara:\n",err)
            return res.status(-1005).send("Error while creating comment");
        })
         

};


const getAllComments=async(req,res)=>{

    const postId=req.params.postId;

    const sql=`SELECT * FROM comment WHERE postId = ?`;

    connection.query(sql,[postId],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).send("Error while loading comments")
        }else{
            
            return res.status(200).send(result);
        }

    })

};


module.exports={createComment,
    getAllComments
};


























