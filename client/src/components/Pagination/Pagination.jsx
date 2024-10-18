import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { Parser } from "html-to-react";
import { useNavigate,Link } from "react-router-dom";
import { getposts } from "../../actions/posts";
import { useSelector } from "react-redux";
function Pagination({dispatch,pagenum }) {
 const {numberofPages,currentPage,startIndex}=useSelector((state)=>state.posts_reducer)
 console.log("number of pages check ",numberofPages)
 const [Pages, setPages] = useState(null)
//  if(numberofPages){  

//    setPages(Array.from({ length:numberofPages<5?numberofPages:5}, (_, index) => index + 1))
//  }

//  currentPage:1
// numberofPages:1
 let navigate=useNavigate();
   const handlePageChange = (page,move) => {
     
     // setCurrentPage(page);
     
     if(move==='next'&&currentPage<numberofPages){
      // console.log("numberof pages",numberofPages)
       if(Pages[Pages.length-1]<Number(numberofPages)){
         console.log("nextyy")
         setPages(Pages.map((itm)=>itm+1))

       }
    }
    else if(move==='prev'&&currentPage>1){
      if(Pages[0]>1){
        console.log("prevyy")

        setPages(Pages.map((itm)=>itm-1))
      }
    }
    dispatch(getposts(page))
  };

  useEffect(() => {
    // console.log("useeffect")
  if(pagenum)
    
    // console.log('/////',numberofPages)
    // console.log('/////',pagenum)
     if(!Pages && numberofPages)
    setPages(Array.from({ length:numberofPages<5?numberofPages:5}, (_, index) => index + 1))
    
     dispatch(getposts(pagenum));
  }, [dispatch,pagenum,numberofPages]);






  return  !Pages ? "":(
    
    <div className="w-[100%] flex gap-1 justify-between">
    <Link className={`${currentPage===1? 'bg-[rgb(159,159,159)]':"bg-[rgb(6,115,216)]"} text-blue-50 flex`} to={`/posts?page=${currentPage>1?currentPage-1:currentPage}`}>
    <button
    
      onClick={() => handlePageChange(currentPage - 1,'prev')}
      disabled={currentPage === 1}
    >
      <FaChevronLeft/>
    </button>
    </Link>
    {Pages.map((page) => (

      <Link key={page} to={`/posts?page=${page}`}><button 
      className={` p-4 ${currentPage === page?'bg-[#4f4f4f]':'bg-[#a3a3a3]'}   text-blue-50 rounded-sm `}
        key={page}
        onClick={() => handlePageChange(page)}
        disabled={currentPage === page}
      >
        {page}
      </button></Link>
    ))}
    <Link   className={`${currentPage===numberofPages? 'bg-[rgb(159,159,159)]':"bg-[rgb(6,115,216)]"} text-blue-50 flex`}  to={`/posts?page=${currentPage<numberofPages?currentPage+1:currentPage}`} >
    <button
 
      onClick={() => handlePageChange(currentPage + 1,'next')}
      disabled={currentPage === numberofPages}
    >
     <FaChevronRight/>
    </button>
    </Link>
  </div>
  );
}

export default Pagination;
