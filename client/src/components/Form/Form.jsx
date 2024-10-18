import { useEffect, useRef, useState } from "react";

import {  useSelector } from "react-redux";
import { createpost, updatepost } from "../../actions/posts";
function Form({ Current_id, setCurrent_id ,dispatch}) {
  
  let userLocal = JSON.parse(localStorage.getItem("profile_"));
  const single_post = useSelector((state) =>
    Current_id ? state.posts_reducer.posts.find((p) => p._id === Current_id) : null
  );
  
  const [imageUrl,setimageUrl]=useState(null)
  const [File,setFile]=useState(null)
  const { user } = useSelector((state) => state.user_reducer);
  let InputRef = useRef(null);
  const [Postdata, setPostdata] = useState({
    title: "",
    text: "",
    tags: "",
   file: "",
    creator_img:""
  });
  useEffect(() => {
    if (single_post) {
      setPostdata(single_post);
    }
  }, [single_post]);
  console.log(Postdata,"><>><>")
  const handlesubmit = async (e) => {
    console.log("---->", Postdata);
    e.preventDefault();
    if (Current_id) {
      if(File){
         console.log(File,"LLL")
        dispatch(
          updatepost({ ...Postdata, name: userLocal?.user_?.name,file:File }, Current_id)
        );
      }else{
        dispatch(
          updatepost({ ...Postdata, name: userLocal?.user_?.name }, Current_id)
        );

      }
      setCurrent_id(null);
    } else {
      if(imageUrl){

        dispatch(
          createpost({
            ...Postdata,
            name: userLocal?.user_?.name,
            creator: userLocal?.user_._id,
            creator_img:user.profile_img_||"",
            file:File
          })
        );
      }else{
        alert("Please upload Select image")
      }
      }
    clear();
  };
  function clear() {
    console.log("clear");
    setCurrent_id(null);
    setPostdata({
      title: "",
      text: "",
      tags: "",
      file: "",
    });
    setimageUrl(null);
    setFile(null);
  }
  if (!userLocal?.user_?.name) {
    return (
      <>
        <div className="flex flex-col border bg-[#F1F1F1] p-3 rounded-md shadow-md gap-2">
          please Sign in to create post
        </div>
      </>
    );
  }
  const  handleFileChange = (e) => {
 
    setFile(e.target.files[0])
    setimageUrl(URL.createObjectURL(e.target.files[0]))
    setPostdata({...Postdata,file:URL.createObjectURL(e.target.files[0])})
  }; 
  const handleFileClick = () => {
     
    
    if (InputRef.current) {
      InputRef.current.click();
    }
 
};
  return (
    <>
      <div className="flex flex-col bg-[#F1F1F1] p-3 rounded-md shadow-md gap-2">
        <div className="text-center">
          {Current_id ? "Update" : "Create"} post
        </div>

        <input
          placeholder="title"
          className="border border-gray-700 px-2 py-1 rounded-md mb-2"
          value={Postdata.title}
          name="title"
          onChange={(e) => setPostdata({ ...Postdata, title: e.target.value })}
        />
        <textarea
          placeholder="text"
          className="border border-gray-700 px-2 py-1 rounded-md mb-2"
          value={Postdata.text}
          name="text"
          onChange={(e) => setPostdata({ ...Postdata, text: e.target.value })}
        />
        <input
          placeholder="tags"
          className="border border-gray-700 px-2 py-1 rounded-md mb-2"
          value={Postdata.tags}
          name="tags"
          onChange={(e) =>
            setPostdata({ ...Postdata, tags: e.target.value.split(",") })
          }
        />
       
          {/* <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              return setPostdata({ ...Postdata, selectedFile: base64 });
            }}
          /> */}
   
          <input type='file' style={{ display: 'none' }}  onChange={handleFileChange} ref={InputRef}/>
          <div onClick={handleFileClick} className='transition-transform duration-300 hover:scale-105 bg-[#b0b0b0]  min-h-[140px]  w-[100%] items-center flex justify-center  rounded-md cursor-pointer bg-no-repeat bg-center bg-clip bg-cover'  style={{ backgroundImage: `url(${!Current_id?imageUrl:!imageUrl? `${import.meta.env.VITE_backendUrl+Postdata.file}`:imageUrl})` }}>
  
                             {
                               !imageUrl&& <span>upload image</span>
                             }  
         </div>
         </div>
    
       
      
      <button
          className="bg-blue-500 rounded-md text-gray-50"
          type="submit"
          onClick={handlesubmit}
        >
          Submit
        </button>
        <button
          className="bg-[#DD5B5B] rounded-md text-gray-50"
          onClick={clear}
        >
          Clear
        </button>
    </>
  );
}

export default Form;
