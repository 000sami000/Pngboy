const express =require('express');
const router=express.Router();
const {getpost,getsearchposts,getposts,createpost,updatepost,deletepost,likepost,create_comment}=require('../controllers/posts')
const auth=require('../middleware/auth')
const upload=require('../config/multerconfig');
router.get('/',getposts);
router.get('/search',getsearchposts);
router.post('/',auth,upload.single('file'),createpost);
router.patch('/:id',auth,upload.single('file'),updatepost);
router.delete('/:id',auth,deletepost);
router.patch('/:id/likepost',auth,likepost);
router.get('/:id',getpost);
router.post(`/:post_id/comment`,auth,create_comment)
module.exports=router;