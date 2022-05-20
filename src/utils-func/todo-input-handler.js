export const todoInputHandler=(id,todoValues,setTodoValues)=>{
    let newTodo=todoValues.map(item=>item.id===id?{...item,isDone:!item.isDone}:item)
    setTodoValues(newTodo)
  }