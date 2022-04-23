import { useReducer, useState } from 'react';
import './App.css';
import {v4 as uuid} from "uuid";

function App() {

  const reducerFunc=(state,action)=>{
    switch (action.type) {
      case 'set-name':
        return {...state,userName:action.nameValue}
      case 'set-email':
        return {...state,userEmail:action.emailValue}
      case "email-true-showName-false":
        return {...state,isEmail:true,showName:false}
      case "password-true-email-false":
        return {...state,isPassword:true,isEmail:false}
      case "password-false-focus-true":
        return {...state,isPassword:false,focus:true,time:action.timeValue}
      case 'greetings':
        return {...state,greetings:action.greet}
      case 'show-modal':
        return {...state,showModal:!state.showModal}
      default:
        break;
    }
  }

  const initilaState={userName:"",userEmail:"",showName:true,isEmail:false,isPassword:false,time:null,focus:false,greetings:"",showModal:false}

  const [state,dispatch]=useReducer(reducerFunc,initilaState)
  const [todoInput,setTodoInput]=useState()
  const [todoValues,setTodoValues]=useState([])
  const [editId,setEditId]=useState()

  const addHandler=(value)=>{
  if(todoValues.some(todo=>todo.id===editId.id)){
    console.log("if chala",editId);
    setTodoValues([...todoValues,{...editId,todoName:value}])
  }else{
    console.log("else chala");
    setTodoValues([...todoValues,{id:uuid(),todoName:value,isDone:false}])
  }
  setTodoInput("")
}

  const todoInputHandler=(id)=>{
  let newValue=todoValues.map(item=>item.id===id?{...item,isDone:!item.isDone}:item)
  setTodoValues(newValue)
}
  
  let date=new Date()
  let hours=(date.getHours()<10?"0":"")+date.getHours()
  let minutes=(date.getMinutes()<10?"0":'')+date.getMinutes()

  const continueNameHandler=()=>{
    dispatch({type:"email-true-showName-false"})
    }

  const continueEmailHandler=()=>{
    dispatch({type:"password-true-email-false"})
  }

  const passwordHandler=()=>{
    dispatch({type:"password-false-focus-true",timeValue:`${hours}:${minutes}`})
    if(hours>5&&hours<12)
    {
      dispatch({type:"greetings",greet:"good morning"})
    }else if(hours>=12&&hours<17)
    {
      dispatch({type:"greetings",greet:"good afternoon"})
    }else if(hours<5)
    {
      dispatch({type:"greetings",greet:"good evening"})
    }
  }

  const todoHandler=()=>{
    dispatch({type:"show-modal"})
  }

  const cancelHandler=(id)=>{
    setTodoValues(todoValues.filter(item=>item.id!==id))
  }

  const editHandler=(item)=>{
    setTodoInput(item.todoName)
    setEditId(item)
    todoValues.some(todos=>todos.id)
  }

  const {showName,isEmail,userName,isPassword,focus,time,greetings,showModal}=state


  return (
    <div className='extension-container'>
      {showName&&
      <div>
        {console.log(state.userName)}
      <h1 className='main-heading'>Hello,What's your name?</h1>
      <input onChange={(e)=>dispatch({type:"set-name",nameValue:e.target.value})} className='detail-input' type="text" />
      <div>
      <button onClick={continueNameHandler} className='Countinue-btn cursor-pointer'>Continue</button>
      </div>
      </div>
      }
      {isEmail&&<div>
      <h1 className='main-heading'>{`What's your email ${userName}`}</h1>
      <input onChange={(e)=>dispatch({type:"set-email",emailValue:e.target.value})} className='detail-input' type="text" />
      <div>
      <button onClick={continueEmailHandler} className='Countinue-btn cursor-pointer'>Continue</button>
      </div>
      </div>
      }
      {isPassword&&<div>
      <h1 className='main-heading'>{`Enter password`}</h1>
      <input className='detail-input' type="password" />
      <div>
      <button onClick={passwordHandler} className='Countinue-btn cursor-pointer'>Continue</button>
      </div>
      </div>
      }
      {focus&&<div className='main-focus'>
      <div className='main-heading extension-time'>{time}</div>
      <h1 className='main-heading'>{`${greetings} ${userName}`}</h1>
      <h1 className='main-heading'>What's your main focus for today?</h1>
      <input className='detail-input' type="password" />
      <div>
      <button onClick={passwordHandler} className='Countinue-btn cursor-pointer'>Continue</button>
      </div>
      {showModal&&<div className='ToDo-modal-container'>
        <div className='ToDo-modal'>
          {console.log(todoValues,"from below")}
          {todoValues.map(item=><div key={item.id}>
            <div className='todo-container'>
            <input onChange={()=>todoInputHandler(item.id)} type="checkbox" name="" id="" /><span className='todo-names' style={{textDecoration:item.isDone?"line-through":"none"}}>{item.todoName}</span><span onClick={()=>editHandler(item)} class="material-symbols-rounded">edit</span><span onClick={()=>cancelHandler(item.id)} class="material-symbols-rounded cursor-pointer">close</span>
            </div>
          </div>)}
          <div className='todo-input-container'>
            <div>
              <div className='todo-input-button'> 
          <input value={todoInput} className='todo-input' onChange={(e)=>setTodoInput(e.target.value)} placeholder='New Todo' type="text" autoFocus/>
          <button className='cursor-pointer todo-add' onClick={()=>addHandler(todoInput)}>Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>}
      <h1 className='ToDo-button cursor-pointer' onClick={todoHandler}>ToDo</h1>
      </div>
      }
    </div>
  );
}

export default App;

