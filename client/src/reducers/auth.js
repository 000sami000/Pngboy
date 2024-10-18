const auth_reducer=(state={auth_data:null},action)=>{

  console.log("auth reducer -action---",action);
  
  switch (action.type) {
    case "SIGNUP":
         localStorage.setItem('profile_',JSON.stringify(action?.payload))
         console.log('state--SIGNUP',state)
         return {...state,auth_data:action.payload}
    case "SIGNIN":
        localStorage.setItem('profile_',JSON.stringify(action?.payload))
        console.log('state--SIGNIN',state)
        return {...state,auth_data:action.payload}
    case "LOGOUT":
        localStorage.setItem('profile_',null)
     console.log('state--LOGOUT',state)
     return {...state,auth_data:null}
    default:
        return state
        
  }

}
export default auth_reducer;