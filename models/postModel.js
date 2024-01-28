const connection=require('../config/dbConnection');

class Post{
    constructor(postId,userId,content,timestamp){
        this.postId=postId;
        this.userId=userId;
        this.content=content;
        this.timestamp=timestamp;
    }

    static  createPost(post){
        return new Promise((resolve,reject)=>{
            connection.query('INSERT INTO post (userId, content) VALUES (?, ?)',[post.userId, post.content],(error,results)=>{
                if(error)
                    reject(error);
                else
                resolve(true);}
        )




        });
    }
}



module.exports=Post;

















