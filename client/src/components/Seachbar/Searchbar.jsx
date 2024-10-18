import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { getpostsbysearch } from "../../actions/posts";
function Searchbar({dispatch, Searchterm, setSearchterm, Searchtags, setSearchtags ,navigate}) {
  
  const [Targetinput, setTargetinput] = useState(
    document.getElementById("targetinput")?.value || ""
  );




  function handleKeyDown(e) {
    if (e.key === " "||e.key === 'Enter') {
      if (Targetinput!=' ') {
        
        setSearchtags([...Searchtags, Targetinput]);
      }
      document.getElementById("targetinput").value = "";
      setTargetinput('');
      // console.log("spacae pressed", Searchtags);
    } 
   
  }
   function handler(e){
    setTargetinput(e.target.value);
    // console.log("---->", Targetinput);
   }
   function remove(itm){
       setSearchtags(Searchtags?.filter((ele)=>ele!==itm))
   }
   const inputStyle = {
    width: `${Math.max(50, Targetinput.length * 8)}px`,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden', // Set a minimum width of 50px and increase by 8px per character
  };
 
  function searchPost(){
   if(Searchterm.trim()|| Searchtags.length>0){
    //dispatch action
    console.log(Searchterm,"_ __ _",Searchtags)
    dispatch(getpostsbysearch({Searchterm,Searchtags:Searchtags.join('-')}))
    navigate(`/posts/search?searchQuery=${Searchterm || 'none'}&tags=${Searchtags.join('-') }`)
   }

  }
  useEffect(()=>{
    
  searchPost();
  },[Searchterm && Searchtags])
  function handle_key_search(e){
    if(e.key==='Enter'){
      //search
      searchPost()
    }
  }
  return (
    <div className="p-2 rounded-[5px] shadow-sm  flex flex-col gap-2 bg-slate-200 w-full">
      <input
        className="px-2 outline-none w-full rounded-tl-[3px] rounded-bl-[3px]"
        placeholder="search here"
        onChange={(e)=>{ setSearchterm(e.target.value);}}
        value={Searchterm}
        onKeyDown={handle_key_search}
      />
      {
        <div className="bg-slate-100 w-full rounded-[5px] flex flex-wrap">
           {   
            Searchtags?.map((itm ,index) => (
            <span
              key={itm+index}
              className="p-1 rounded-[5px]    bg-gray-500 text-stone-100 mx-1 my-1 flex items-center"
            >
              {itm}
              <div className="ml-1" onClick={()=>{remove(itm)}} >
              <TiDelete  className="text-slice-400" />
              </div>
            </span>
          ))}
          <input
            className="px-2  outline-none   rounded-tl-[3px] rounded-bl-[3px]  bg-slate-100 "
            id="targetinput"
            onKeyDown={handleKeyDown}
            onChange={handler}
            style={inputStyle}
            
          />
        </div>
      }

      <button  onClick={()=>{searchPost()}} className=" bg-slate-300 w-full rounded-tr-[3px] rounded-br-[3px] p-1 text-[0.8em]">
        search
      </button>
    </div>
  );
}

export default Searchbar;
