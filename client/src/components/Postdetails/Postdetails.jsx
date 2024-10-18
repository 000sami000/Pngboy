import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getsinglepost, getpostsbysearch } from "../../actions/posts";
import Loader from "../Loader";

import CommentSection from "./CommentSection";

function Postdetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  let { id } = useParams();

  const { posts, post, isLoading } = useSelector(
    (state) => state.posts_reducer
  );

  useEffect(() => {
    if (id) {
      dispatch(getsinglepost(id));
    }
    console.log("dispatach use efftect");
  }, [id]);
  useEffect(() => {
    if (post) {
      dispatch(getpostsbysearch({ Searchtags: post.tags.join("-") }));
    }
  }, [post]);
  // function Like() {
  //   if (post?.likes.length > 0) {
  //     return (
  //       <span>
  //         {post?.likes.find((like) => like === user?.user_?._id) ? (
  //           <span className="text-md ">
  //             <AiFillLike />{" "}
  //           </span>
  //         ) : (
  //           <span className="text-md">
  //             <AiOutlineLike />
  //           </span>
  //         )}
  //       </span>
  //     );
  //   }
  //   return (
  //     <>
  //       <span>
  //         <AiOutlineLike />
  //       </span>
  //     </>
  //   );
  // }
  const recommended_post = posts?.filter((itm) => itm._id !== post?._id);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="bg-[#efefef7f]  rounded-[10px] w-[80%] h-[auto]  m-auto mt-5 flex justify-between  max-[1190px]:flex-col-reverse max-[1189px]:w-[50%] ">
            <div className=" flex flex-col gap-4 w-[50%] py-3 max-[1189px]:w-[90%]">
              <div className="flex flex-col  px-2 rounded-t-[10px] max-[1189px]:absolute top-[75px]">
                <div className="p-2 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="bg-blue-400 rounded-[50px] h-[35px] w-[35px] max-[800px]:h-[30px] max-[800px]:w-[30px]"><img src={`${import.meta.env.VITE_backendUrl+post?.creator_img||'/profile.jpg'}`} className="rounded-[50px]"/></div>
                    <div className="flex flex-col ">
                      <span className="text-[13px] text-white max-[800px]:text-[12px]">
                        {post?.name}
                      </span>
                      <span className="text-[11px] text-white max-[800px]:text-[8px]">
                        {moment(post?.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-[25px] text-white font-bold px-2 max-[800px]:text-[21px] bg-[rgba(206,206,206,0.06)] max-[1189px]:bg-[rgba(206,206,206,0)]">
                  {post?.title}
                </div>
              </div>

              <div className="flex  px-5 w-full h-full  ">
                <div>
                  <span className=" text-[#454fda]  text-[13px] w-full">
                    {post?.tags.map((itm) => {
                      return `#${itm} `;
                    })}
                  </span>
                  <div className="text-[#6e6e6e] text-[12px] w-full break-words">
                    {post?.text}
                  </div>
                </div>
              </div>
           
            </div>
            <div className=" w-[50%] max-[1189px]:w-[100%] flex flex-col ">
              <img
                className=" w-[70%] max-[1189px]:w-[100%] rounded-tr-[10px] rounded-br-[10px] self-end max-[1189px]:rounded-tl-[10px] max-[1189px]:rounded-tr-[10px] max-[1189px]:rounded-br-[0px]"
                src={`${import.meta.env.VITE_backendUrl+post?.file}`}
              />
            </div>
          </div>
          <div className="bg-[#b38585] w-[80%] h-[260px] m-auto mt-4 rounded-[10px] p-3">
            <CommentSection post={post} />
          </div>
          <br />
          <br />
          <div className="text-center text-[35px] text-slate-500">
            Related Posts
          </div>
          <div className="grid  sm:grid-cols-2 md:grid-cols-3  gap-2.5   m-auto w-[80%]  p-4">
          {recommended_post.length ? (
            recommended_post?.map((itm) => {
              return (
                <div className="w-[100%] h-[405px] overflow-hidden bg-[#b6b6b6] rounded-[10px]" onClick={() => { navigate(`/post/${itm._id}`, {state: { previousUrl: location.pathname },});}} key={itm._id} >
                  <div>
                    <img   src={`${itm.selectedFile}`}  width={"100%"}/>
                    <div className="py-2 px-3">
                    <span className="text-[16px]" >{itm.title}</span>
                    <div className="text-[11px]">{itm.text}</div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full text-[30px] text-slate-300 mt-10">
              No post Found
            </div>
          )}

        </div>
        </div>
      )}
    </>
  );
}

export default Postdetails;
