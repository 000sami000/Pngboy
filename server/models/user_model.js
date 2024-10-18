let mongoose=require('mongoose')
const user_schema=new mongoose.Schema({
    profile_img_:{type:String,default:""},    
name:{type:String,required:true},
email:{type:String,required:true},
password:{type:String,required:true},
username:{type:String,require:true}
})
const userModel=mongoose.model('user',user_schema);
module.exports=userModel;