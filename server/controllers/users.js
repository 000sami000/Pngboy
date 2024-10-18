const bcrypt =require("bcrypt")
const jwt= require("jsonwebtoken");
const userModel= require("../models/user_model");
const postModel = require("../models/post_model");
const fs=require("fs")
const path=require("path")
 const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const ispasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!ispasswordCorrect) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
     process.env.JWT_SECRET,
      { expiresIn: "1M" }
    );

    res.status(200).json({ user_:existingUser, token_: token });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
const signup = async (req, res) => {
  const { FirstName, SecondName, email, password, confirmpassword } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Password did't match" });
    }
    const hashedpassword = await bcrypt.hash(password, 12);
    const new_user = await userModel.create({
      email,
      password: hashedpassword,
      name: `${FirstName} ${SecondName}`,
    });
    const token = jwt.sign(
      { email: new_user.email, id: new_user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1M" }
    );
    res.status(200).json({ user_: new_user, token_: token });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
const getuser=async (req,res)=>{

      try{
        console.log(req.userID)
        let user= await userModel.findById(req.userID);
        console.log(user)
        user.password=null;
          res.status(200).json(user)   
      }catch(err){
        res.status(400).json({message:err})
      }
}
const updateuser=async (req,res)=>{
  let {userID}=req;
  const userdata = req.body;
 
  try{
    let user= await userModel.findById(userID);
    user.email=userdata.email;
    user.name=`${userdata.FirstName} ${userdata.SecondName}`;
    const oldImage = user.profile_img_;
 
    if (req.file) {
      user.profile_img_ = `/uploads/${req.file.filename}`;
      await postModel.updateMany(
        { creator: userID },
        { $set: { name: user.name, creator_img: user.profile_img_ || "" } }
      );
      if (oldImage) {
        const filePath = path.join(__dirname, '../uploads', oldImage.split('/')[2]);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          } else {
            console.log('Old profile image deleted successfully');
          }
        });
      }
    } else {
      await postModel.updateMany({ creator: userID }, { $set: { name: user.name } });
    }
    let user_updated= await userModel.findByIdAndUpdate(userID,user,{new:true});
    user_updated.password=null;
      res.status(200).json( user_updated)   
  }catch(err){
    console.log(err)
    res.status(400).json({message:err})
  }
}

module.exports={signin,signup,getuser,updateuser}