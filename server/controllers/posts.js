const { default: mongoose } = require("mongoose");
const postModel = require("../models/post_model");
const fs=require("fs")
const path=require("path")
const getposts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 4;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await postModel.countDocuments({});

    const posts = await postModel
      .find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res
      .status(200)
      .json({
        data: posts,
        currentPage: Number(page),
        numberofPages: Math.ceil(total / LIMIT),
        startIndex: startIndex,
      });

  } catch (err) {
    res.status(404).json({ error: err });
  }
};
const getpost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const post = await postModel.findById(_id);

    res.status(200).json({post:post})
  } catch (err) {
    res.status(409).json({ error: err });
  }
};
const createpost = async (req, res) => {

  req.body={...req.body,file:`/uploads/${req.file.filename}`}
  const newpost = new postModel(req.body);

  try {
    await newpost.save();
    res.status(201).json(newpost);
  } catch (err) {
    res.status(409).json({ error: err });
  }
};
const updatepost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;


  try {
    let updatedpost;
    if(req.file){
    
      const postfile=await postModel.findById(_id,{file:1})
      updatedpost = await postModel.findByIdAndUpdate(
        _id,
        { ...post, _id,file:`/uploads/${req.file.filename}` },
        { new: true }
      );
      const filePath = path.join(__dirname,'../uploads',postfile.file.split('/')[2] );
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File deleted successfully');
        }
      });
    }
    else{
       updatedpost = await postModel.findByIdAndUpdate(
        _id,
        { ...post, _id },
        { new: true }
      );

    }

    res.status(200).json(updatedpost);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
const deletepost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  try {
   const postfile=await postModel.findById(_id,{file:1})

   const filePath = path.join(__dirname,'../uploads',postfile.file.split('/')[2] );

fs.unlink(filePath, (err) => {
  if (err) {
    console.error('Error deleting file:', err);
  } else {
    console.log('File deleted successfully');
  }
});
    const deletedpost = await postModel.findByIdAndDelete(_id);
    res.status(200).json(deletedpost);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
const likepost = async (req, res) => {
  const { id: _id } = req.params;
  if (!req.userID) {
    return res.json({ message: "Unauthenticated" });
  }
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  try {

    const post = await postModel.findById(_id);
    const index = post.likes.findIndex((id) => id === String(req.userID));

    if (index === -1) {
 
      post.likes.push(req.userID);
    } else {
  
      post.likes = post.likes.filter((id) => id !== String(req.userID));
 
    }
    
    const updatedpost = await postModel.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.status(200).json(updatedpost);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
const getsearchposts = async (req, res) => {
  console.log("????", req.query);
  let { searchQuery, tags } = req.query;
  tags = tags?.split("-").map((itm) => itm.trim());
  try {
    let search = new RegExp(searchQuery, "i");

    const posts = await postModel.find({
      $or: [{ title: search }, { tags: { $in: tags } }],
    });


    res.status(200).json(posts);
  } catch (err) {
      res.status(400).json({ error: err });
    }
  };
  const create_comment=async (req,res)=>{
    
  const {comment}=req.body;
 const {post_id}=req.params;

 try{
    const post =await postModel.findById(post_id);

    post.comment.unshift(comment);
    const updated_post=await postModel.findByIdAndUpdate(post_id,post,{new:true})
    res.status(200).json(updated_post);
 }catch(err){
   res.status(400).json({ error: err });

 }

}
module.exports = {
  getpost,
  getposts,
  createpost,
  updatepost,
  deletepost,
  likepost,
  getsearchposts,
  create_comment
};
