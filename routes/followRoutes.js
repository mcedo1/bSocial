const express=require('express');
const validateToken = require('../middleware/validateTokenHandler');
const {createFollow,getFollowees,getNoFollowees}=require('../controllers/followController');


const router=express.Router();


router.post('/:followerId',validateToken,createFollow);
router.get('/:followerId',validateToken,getFollowees);
router.get('/un/:followerId',validateToken,getNoFollowees);



module.exports=router;










