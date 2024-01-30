const connection=require('../config/dbConnection');

class Follow{
    constructor(followerId,followeeId){
        this.followerId=followerId,
        this.followeeId=followeeId;
    }

    static  createFollow(follow){
        return new Promise((resolve,reject)=>{
            connection.query('INSERT INTO follow (followerId,followeeId) VALUES (?, ?)',[follow.followerId,follow.followeeId],(error,results)=>{
                if(error)
                    reject(error);
                else
                resolve(true);}
        )




        });
    }
}



module.exports=Follow;














































