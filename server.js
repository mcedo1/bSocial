const express=require('express');
const dotenv=require("dotenv").config();

const connection=require('./config/dbConnection')



const app=express();
const port=process.env.PORT || 3000;


app.use(express.json());


app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/posts',require('./routes/postRoutes'));
app.use('/api/comments',require('./routes/commentRoutes'));



app.listen(port,()=>{
    console.log('Server listening on port ', port);
})













