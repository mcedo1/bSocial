const Post=require('../models/postModel');
const connection=require('../config/dbConnection');

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

const createPost=async(req,res)=>{

    const userId=req.params.userId;
    const {content}=req.body;

    const userExists=await checkUserId(userId);
    if(!userExists){
        console.log(userExists)
        return res.status(404).send("User not found in database");
    } 



        const newPost=new Post(
            0,
            userId,
            content
        );



        Post.createPost(newPost)
        .then(response=>{
            return res.status(200).send(`Post created`)
        }).catch(err=>{
            console.log("Error tokom cuvanja posta:\n",err)
            return res.status(-1005).send("Error creating post");
        })
};






















module.exports=createPost;


























