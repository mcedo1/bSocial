const User=require('../models/userModel');
const connection=require('../config/dbConnection')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const secretSigned=require('../config/secretFile');
const { Kafka,Partitioners } = require('kafkajs');




// Kreiramo Kafka producenta sa odgovarajućom konfiguracijom
const kafka = new Kafka({
  clientId: 'user-service',
  brokers: ['pkc-4r087.us-west2.gcp.confluent.cloud:9092'], 
  ssl: true,
  sasl: {
    mechanism: 'plain',
    username: '7R7FIXK5LFGBQACU', 
    password: 'kLPCmur53+wDkxLDxo7/hqSvdKlKyK50eDoqPrK2GeS7jugTXD1T/V8RU9avehCU' 
},
createPartitioner: Partitioners.LegacyPartitioner 
});

const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner
  });

//funkc za slanje poruke Kafci
async function sendUserRegistrationMessage(user) {
  try {
    await producer.connect(); //povezivanje na kafka cluster
    console.log("Uspjesno smo se povezalina klaster!")

    const topic = 'topic_reg'; 

//poruka koja se salje 
    const message = {
      user: user,
      registrationDate: new Date()
    };

    //slanje poruke u izvjesnu temu 
    await producer.send({
      topic:topic,
      messages: [
        {
          value: JSON.stringify(message)
        }
      ]
    });

    console.log('User registration message sent to Kafka.');

    
    await producer.disconnect();
  } catch (error) {
    console.error('Error sending user registration message to Kafka:', error);
  }
}


//

const registerUser=async(req,res)=>{

try{
    const {firstName,lastName,username,email,password,passwordConfm}=req.body;
    

    const query=`SELECT email FROM user WHERE email=? `;
    connection.query(query,[email],async(error,result)=>{
        if(error){
            console.log("Error  checking email:",error);
            res.status(500).json({message:"Internal server error!"});
        }
        if(result.length>0){
            console.log("User already existing",result);
            return res.status(400).json({message:"User already existing!"})
        }
        if(password!=passwordConfm){
            return res.status(403).json({message:"Password and confirm password doesn't match!"});
        }
        const hashPassword=await bcrypt.hash(password,10);
        console.log(hashPassword);
        const newUser=new User(
            0,
            firstName,
            lastName,
            username,
            email,
            hashPassword
        );

    //    console.log("New user:",newUser);

       await sendUserRegistrationMessage(newUser);
       
    User.createUser(newUser,(error,response)=>{
        if(error){
            console.log("Error occured while creating saving user:",error);
            res.status(500).json({error:"Error occured while creating user"})
        }else
            res.status(200).send(`User has been saved successfully`);
        
    })

    });

}catch(error){
    console.log("Error occured while saving user:",error)
    res.status(500).send({error:"Error occured while savinguser:"})
    
}
};

const loginUser=async(req,res)=>{

    const {identity,password}=req.body;
    
   

    const sql='SELECT * FROM user WHERE email=? OR username=?';

    connection.query(sql,[identity,identity],(error,result)=>{
        if(error){
            console.log(error)
            return res.status(500).send("One internal server error occured")
        }
        if(result.length===0){
            console.log(result)
            return res.status(404).json({message:"1User not found"})
        }else{
        console.log("U redu je user/email nasli smo ga!")  

    
            const user=result[0];
            const hashedPassword=user.password;

            bcrypt.compare(password,hashedPassword,(err,isMatch)=>{
                if(err){
                    console.log("Doslo je do greske")
                    throw err;
                }else{
                    if(!isMatch){
                        console.log("Pogresna je sifra dosla");
                        return res.status(401).send("The password is not correct");
                    }else{
                        console.log("Korisnik je uspjesno prijavljen");
                        const accessToken=jwt.sign({
                            user:{
                                username:user.username,
                                email:user.email,
                                id:user.id,
                            }
                        },secretSigned,
                        {expiresIn:"55m"}
                        );
                        return res.status(200).send(`Successfuly signed in ${accessToken}`)}}})
}})};

const currentUser=async(req,res)=>{
    res.status(200).send(req.user);

};












module.exports={registerUser,
    loginUser,
    currentUser
};













