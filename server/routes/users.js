const express =require('express');
const router=express.Router();

const {signin,signup,getuser,updateuser}=require('../controllers/users');
const auth = require('../middleware/auth');
const upload=require('../config/multerconfig')
router.post('/signin',signin)
router.post('/signup',signup)
router.get('/',auth,getuser)
router.patch('/',auth,upload.single('file'),updateuser)
module.exports=router;