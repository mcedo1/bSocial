const connection=require('../config/dbConnection');

class Comment{
    constructor(commentId,postId,userId,content,timestamp){
        this.commentId=commentId;
        this.postId=postId;
        this.userId=userId;
        this.content=content;
        this.timestamp=timestamp;
    }

    static  createComment(comment){
        return new Promise((resolve,reject)=>{
            connection.query('INSERT INTO comment (postId,userId, content) VALUES (?, ?,?)',[comment.postId,comment.userId, comment.content],(error,results)=>{
                if(error)
                    reject(error);
                else
                resolve(true);}
        )




        });
    }
}



module.exports=Comment;

















