const express=require('express');
const {registerUser,loginUser, currentUser,updateUserPhoto} = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');
const router=express.Router();
const multer=require('multer');
const path=require('path');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./src/pictures");
    },
    filename:function(req,file,cb){
        console.log(file.originalname)
        cb(null,file.originalname)
    }
})

const upload=multer({
    storage:storage
})



router.post('/register',registerUser);
router.post('/register/photo/:userId',upload.single('photo'),updateUserPhoto)
router.put('/register/photo/:userId',upload.single('photo'),updateUserPhoto)
router.post('/login',loginUser);
router.get('/:userId',validateToken,currentUser);


module.exports=router;






















