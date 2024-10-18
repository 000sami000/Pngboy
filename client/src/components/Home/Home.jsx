import React from 'react'
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { getposts } from "../../actions/posts";
import { useNavigate,useLocation } from 'react-router-dom';
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from '../Pagination/Pagination';
import Searchbar from '../Seachbar/Searchbar';

function useQuery(){//custom hook
  return new URLSearchParams(useLocation().search)
}
function Home() {
    const [Current_id,setCurrent_id]=useState(null);
    const dispatch = useDispatch();
 
    const query=useQuery();
    const navigate=useNavigate();
    const pagenum=query.get('page')||1;
    // const searchQuery =query.get('searchQuery')
    // const tags=query.get('tags');
    const [Searchterm,setSearchterm]=useState(query.get('searchQuery')||'');
    const [Searchtags,setSearchtags]=useState(query.get('tags')?.split('-')||[]);


    // useEffect(()=>{
    //   console.log("=====",searchQuery)
    //   console.log("=====",pagenum)
    //   console.log("=====",tags)
    // },[searchQuery,pagenum])
  return (
    <>
    <div className="flex w-full mt-[6%] px-[3%] gap-4">
    <div className="w-[80%]">
      <Posts setCurrent_id={setCurrent_id}  dispatch={dispatch}/>
    </div>
    <div className=" w-[20%] flex flex-col gap-2">
     <Searchbar dispatch={dispatch} navigate={navigate} Searchterm={Searchterm} setSearchterm={setSearchterm} Searchtags={Searchtags} setSearchtags={setSearchtags} />
      <Form Current_id={Current_id} setCurrent_id={setCurrent_id} dispatch={dispatch} />
      {
         (!Searchterm&&!Searchtags.length)&&( 

      <Pagination dispatch={dispatch} pagenum={pagenum}/>
        ) 
      }
    </div>
    </div>
    <div>
    </div>
    </>
  )
}

export default Home