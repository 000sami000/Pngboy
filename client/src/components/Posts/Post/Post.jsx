import React, { useEffect, useState } from "react";
import { AiFillLike ,AiOutlineLike} from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { RiEditCircleFill } from "react-icons/ri";
import moment from 'moment'
import {useDispatch} from 'react-redux'
import { deletedpost,likepost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";
import { LiaDownloadSolid } from "react-icons/lia";
import { downloadFile } from "../../../../util/filesaver";
function Post({ post ,setCurrent_id }) {

  const { createdAt, title, text, tags, file } =post;

    let user =JSON.parse(localStorage.getItem('profile_'))
   const navigate=useNavigate();
   const dispatch=useDispatch()
   function Like(){
       
        if(post.likes?.length>0){
          return (<span>{post?.likes.find((like)=>(like===user?.user_?._id))?(<span className="text-md "><AiFillLike/> </span>):(<span className="text-md"><AiOutlineLike/></span>)}</span> 
        )
        }
        return <><span><AiOutlineLike/></span></>
   }

  return (

    <>
    {
      post &&
   (
    <div  className="flex items-center justify-center  w-full" >  
       <div className="bg-[#efefef7f] rounded-[10px] w-[90%] shadow-md transition-transform duration-300 hover:scale-105">
      <div onClick={()=>{navigate(`/post/${post._id}`)}} className="bg-cover rounded-t-[10px]  bg-no-repeat bg-center w-full h-[250px] " style={{backgroundImage:`url(${import.meta.env.VITE_backendUrl+file})`}}>
          
  
          <div className="flex flex-col justify-between  h-full ">
          <div className="flex justify-between bg-[rgba(203,203,203,0.12)] bg-opacity-30 backdrop-filter backdrop-blur-[1px]  px-2 rounded-t-[10px]">
            <div className="p-2 flex items-center gap-2">
               <div className="bg-blue-400 rounded-[50px] h-[32px] w-[32px] bg-no-repeat bg-center bg-clip bg-cover "  style={{backgroundImage:`url(${import.meta.env.VITE_backendUrl+post.creator_img})`}}>  
               </div>
            <div>
              <div className="text-[14px] text-white">{post.name}</div>
              <div className="text-[12px] text-white">{moment(createdAt).fromNow()}</div>
              </div>
            </div>
            {/* edits */}
            {
              (user?.user_._id===post.creator)?<button onClick={(e)=>{e.stopPropagation();setCurrent_id(post._id);}} > <div className="text-[23px] text-white "><RiEditCircleFill /></div></button>
               :""
            }
          </div>
          <div className="flex justify-between items-center">
          <div className="text-[25px] text-white font-bold px-2  ">{title}</div>
          <div className="hover:bg-[#ffffff6b] mr-1 rounded-md cursor-pointer"  onClick={(e)=>{e.stopPropagation(); downloadFile(post._id,`${import.meta.env.VITE_backendUrl+file}`) }}><LiaDownloadSolid className=" text-[25px] text-[#ffffff] "/></div>
          </div>
          </div>
        </div>
        
       <div className="px-5 w-full">
         <span className=" text-[#333fef]  text-[13px] w-full">{tags?.map((itm)=>{return `#${itm} `})}</span>
        <div className="text-[#6e6e6e] text-[13px] w-full break-words h-[57px] overflow-hidden" >{text}</div>
          <div className="flex justify-between ">
            <button onClick={ (e)=>{e.stopPropagation();if(!user?.user_){alert("Login to Like")}else{dispatch(likepost(post._id)); Like(); }} }  className="hover:bg-[#ffffff81] rounded-sm px-1"> <div className="flex items-center text-[22px] text-[#202670]"><Like/>&nbsp;{post?.likes?.length}</div></button>
             {
              (user?.user_._id===post.creator)?<button onClick={(e)=>{ e.stopPropagation();dispatch(deletedpost(post._id)); }}  disabled={!user?.user_} className="hover:bg-[#ffffff81] rounded-sm p1"> <div><MdDelete className=" text-[22px] text-[#202670]"/></div></button>
                :""
             }
         </div>  
       </div>
      </div>
   
      </div>
   )
    }
    </>
  );
}

export default Post;
