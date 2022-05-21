import { createContext,useContext,useReducer, useState } from "react";
import { reducerFunc } from "../../reducer/reducer";


const HomeContext=createContext()

const HomeProvider=({children})=>{
    const [userNameState,setUserNameState]=useState(()=>{
        let saved=localStorage.getItem("extension-user")
        if(saved)
        {
            return saved
        }else{
            return ""
        }
    })
    
    const initilaState={nameOfUser:"",userEmail:"",showName:true,isEmail:false,isPassword:false,time:null,focus:false,greetings:"",showModal:false}
    const [state,dispatch]=useReducer(reducerFunc,initilaState)
    return <HomeContext.Provider value={{state,dispatch,userNameState,setUserNameState}}>{children}</HomeContext.Provider>
}

const useHome=()=>useContext(HomeContext)

export {HomeProvider,useHome}