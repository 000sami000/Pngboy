let mongoose=require('mongoose')
const post_schema=new mongoose.Schema({
    title:{
        type:String
    },
    creator_img:{
        type:String
    },
    text:{
        type:String
    },
    name:{type:String},
    creator:{type:String},
    tags:[String],
    file:String,
    likes:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    comment:{type:[String],default:[]}
})
const postModel=mongoose.model('posts',post_schema);
module.exports=postModel;