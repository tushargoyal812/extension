import {v4 as uuid} from "uuid";
export const addHandler=(value,setTodoValues,todoValues,setTodoInput)=>{
    setTodoValues([...todoValues,{id:uuid(),todoName:value,isDone:false}])
  setTodoInput("")
}