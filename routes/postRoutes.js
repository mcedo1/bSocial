const express=require('express');
const {createPost,getAllPosts, getSinglePost}= require('../controllers/postController');
const validateToken = require('../middleware/validateTokenHandler');



const router=express.Router();


router.post('/:userId',validateToken,createPost);
router.get('/:userId',validateToken,getAllPosts);


module.exports=router;










