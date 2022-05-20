import { createContext,useContext,useState } from "react";


const TodoContext=createContext()


const TodoProvider=({children})=>{
    const [todoInput,setTodoInput]=useState()
    const [todoValues,setTodoValues]=useState(()=>{
        const saved=localStorage.getItem("todo")
        if(saved){
         return JSON.parse(saved)
        }else{
         return []
        }
      })
    return <TodoContext.Provider value={{todoInput,setTodoInput,todoValues,setTodoValues}}>{children}</TodoContext.Provider>
}


const useTodo=()=>useContext(TodoContext)

export {useTodo,TodoProvider}