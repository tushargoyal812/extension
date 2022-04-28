import { createContext,useContext,useReducer } from "react";
import { reducerFunc } from "../../reducer/reducer";


const HomeContext=createContext()

const HomeProvider=({children})=>{
    const initilaState={userName:"",userEmail:"",showName:true,isEmail:false,isPassword:false,time:null,focus:false,greetings:"",showModal:false}
    const [state,dispatch]=useReducer(reducerFunc,initilaState)
    return <HomeContext.Provider value={{state,dispatch}}>{children}</HomeContext.Provider>
}

const useHome=()=>useContext(HomeContext)

export {HomeProvider,useHome}