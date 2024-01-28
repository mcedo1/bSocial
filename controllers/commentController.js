const connection=require('../config/dbConnection');
const Comment = require('../models/commnetModel');

async function checkUserId(userId){
    return new Promise((resolve,reject)=>{
        const sql='SELECT * FROM user  WHERE userId=?';
        connection.query(sql,[userId],(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result.length>0);
            }
        })
    })
}

const createComment=async(req,res)=>{

    const userId=req.params.userId;
    const {postId,content}=req.body;

    const userExists=await checkUserId(userId);
    if(!userExists){
        console.log(userExists)
        return res.status(404).send("User not found in database");
    } 



        const newComment=new Comment(
            0,
            postId,
            userId,
            content
        );



        Comment.createComment(newComment)
        .then(response=>{
            return res.status(200).send(`Comment  created`)
        }).catch(err=>{
            console.log("Error tokom cuvanja komentara:\n",err)
            return res.status(-1005).send("Error while creating comment");
        })
         

};


module.exports=createComment;


























