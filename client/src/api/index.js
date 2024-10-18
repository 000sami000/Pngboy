import axios from "axios";

const API=axios.create({baseURL:"http://localhost:5000"})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile_')){
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile_'))?.token_}`
    }
    return req;
})
export const fetchPosts=(pagenum)=>{
    return API.get(`/posts?page=${pagenum}`);
}
export const createPosts=(post_obj)=>{
    return API.post('/posts',post_obj,{headers: {
        'Content-Type': 'multipart/form-data'
      }});
}
export const updatePosts=(post_obj,id)=>{
    return API.patch(`/posts/${id}`,post_obj,{headers: {
        'Content-Type': 'multipart/form-data'
      }});
}
export const deletePosts=(id)=>{
    return API.delete(`/posts/${id}`);
}
export const likePosts=(id)=>{
    return API.patch(`/posts/${id}/likepost`)
}
export const signin=(formdata)=>{
   return API.post('/users/signin',formdata)
}
export const signup=(formdata)=>{
    return API.post('/users/signup',formdata)
 }
 export const fetchPostbysearch=(searchQuery)=>{
  return API.get(`/posts/search?searchQuery=${searchQuery.Searchterm || 'none'}&tags=${searchQuery.Searchtags|| null}`)
 }
 export const  fetchsinglepost=(id)=>{
    return API.get(`/posts/${id}`)
 }
 export const create_comment=(comment,post_id)=>{
    // console.log(post_id,"++++",comment)
    return API.post(`/posts/${post_id}/comment`,{comment})
 }

 export const getuser=()=>{
   return API.get(`/users`)
}
export const updateuser=(Data)=>{
    console.log(Data,"???????")
     return API.patch(`/users`,Data,{headers: {
        'Content-Type': 'multipart/form-data'
      }})

 }