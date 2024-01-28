const express=require('express');
const createPost = require('../controllers/postController');
const validateToken = require('../middleware/validateTokenHandler');



const router=express.Router();


router.post('/:userId',validateToken,createPost);



module.exports=router;










