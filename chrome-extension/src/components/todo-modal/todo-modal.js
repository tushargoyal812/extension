import { addHandler } from "../../utils-func/add-todo-handler"
import { todoInputHandler } from "../../utils-func/todo-input-handler"
import { cancelHandler } from "../../utils-func/cancel-handler"
import { useTodo } from "../../context/todo-context/todo-context"
export const TodoModal=()=>{
    const {setTodoValues,todoValues,setTodoInput,todoInput}=useTodo()
    return(
        <div className='ToDo-modal-container'>
        <div className='ToDo-modal'>
          {todoValues.map(item=><div key={item.id}>
            <div className='todo-container'>
            <input onChange={()=>todoInputHandler(item.id,todoValues,setTodoValues)} type="checkbox" name="" id="" /><span className='todo-names' style={{textDecoration:item.isDone?"line-through":"none"}}>{item.todoName}</span><span class="material-symbols-rounded">edit</span><span onClick={()=>cancelHandler(item.id,setTodoValues,todoValues)} class="material-symbols-rounded cursor-pointer">close</span>
            </div>
          </div>)}
          <div className='todo-input-container'>
            <div>
              <div className='todo-input-button'> 
          <input value={todoInput} className='todo-input' onChange={(e)=>setTodoInput(e.target.value)} placeholder='New Todo' type="text" autoFocus/>
          <button className='cursor-pointer todo-add' onClick={()=>addHandler(todoInput,setTodoValues,todoValues,setTodoInput)}>Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}