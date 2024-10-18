import "./App.css";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

import { BrowserRouter, Route, Routes,Navigate} from "react-router-dom";
import Postdetails from "./components/Postdetails/Postdetails";
import { useDispatch} from "react-redux";
import Profile from "./components/User_profile/Profile";
import { useEffect } from "react";
import { Getuser } from "./actions/users";

function App() {
  let userlocalstorage =JSON.parse(localStorage.getItem('profile_'))
   const dispatch=useDispatch();
    useEffect(()=>{
    dispatch(Getuser())     
    },[])
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
        
        <Route path='/'  exact Component={()=> <Navigate to="/posts"/> }/>
          <Route path="/posts" exact Component={Home}/>
          <Route path="/user/:userId" exact Component={Profile}/>
          <Route path="/posts/search" exact Component={Home}/>
          <Route path="/post/:id" exact Component={Postdetails}/>
          <Route path="/auth" exact Component={()=>{return !userlocalstorage?<Auth/>:<Navigate to={'/posts'}/>}} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
