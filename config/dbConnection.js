const mysql=require('mysql');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'bdata'
});



connection.connect((err)=>{
    if(err){
        console.log("Error occured while connecting to database",err);
        throw err;
    }
    console.log("Connection established!")

});

module.exports=connection;