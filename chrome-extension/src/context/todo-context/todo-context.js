import { createContext,useContext,useState } from "react";


const TodoContext=createContext()


const TodoProvider=({children})=>{
    const [todoInput,setTodoInput]=useState()
    const [todoValues,setTodoValues]=useState([])
    return <TodoContext.Provider value={{todoInput,setTodoInput,todoValues,setTodoValues}}>{children}</TodoContext.Provider>
}


const useTodo=()=>useContext(TodoContext)

export {useTodo,TodoProvider}