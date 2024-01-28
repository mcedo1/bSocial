const jwt=require('jsonwebtoken');
const secretFile=require('../config/secretFile');

const validateToken=async(req,res,next)=>{
let token;
const authHeader=req.headers.authorization || req.headers.Authorization;
console.log(authHeader)

if(authHeader && authHeader.startsWith('Bearer')){
    token=authHeader.split(" ")[1];
    jwt.verify(token,secretFile,(err,decoded)=>{
        if(err){
            return res.status(401).send("An error occured while verifying user.")
             
        }
            req.user=decoded.user;
            next();
        
    })
    if(!token){

        return res.status(401).send("User is not authorized. ")
    }
}else{
    res.status(403).send("3User doesn't have valid authentication!")
}};

module.exports=validateToken;
















