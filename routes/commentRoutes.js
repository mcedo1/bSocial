const express=require('express');
const createComment = require('../controllers/commentController');
const validateToken = require('../middleware/validateTokenHandler');



const router=express.Router();


router.post('/:userId',validateToken,createComment);



module.exports=router;










