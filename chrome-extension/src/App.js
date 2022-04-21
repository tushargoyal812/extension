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
      default:
        break;
    }
  }

  const initilaState={userName:"",userEmail:"",showName:true,isEmail:false,isPassword:false,time:null,focus:false,greetings:""}
  const [state,dispatch]=useReducer(reducerFunc,initilaState)
  
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

  const {showName,isEmail,userName,isPassword,focus,time,greetings}=state


  return (
    <div className='extension-container'>
      {showName&&
      <div>
        {console.log(state.userName)}
      <h1 className='main-heading'>Hello,What's your name?</h1>
      <input onChange={(e)=>dispatch({type:"set-name",nameValue:e.target.value})} className='detail-input' type="text" />
      <div>
      <button onClick={continueNameHandler} className='Countinue-btn'>Continue</button>
      </div>
      </div>
      }
      {isEmail&&<div>
      <h1 className='main-heading'>{`What's your email ${userName}`}</h1>
      <input onChange={(e)=>dispatch({type:"set-email",emailValue:e.target.value})} className='detail-input' type="text" />
      <div>
      <button onClick={continueEmailHandler} className='Countinue-btn'>Continue</button>
      </div>
      </div>
      }
      {isPassword&&<div>
      <h1 className='main-heading'>{`Enter password`}</h1>
      <input className='detail-input' type="password" />
      <div>
      <button onClick={passwordHandler} className='Countinue-btn'>Continue</button>
      </div>
      </div>
      }
      {focus&&<div>
      <div className='main-heading extension-time'>{time}</div>
      <h1 className='main-heading'>{`${greetings} ${userName}`}</h1>
      <h1 className='main-heading'>What's your main focus for today?</h1>
      <input className='detail-input' type="password" />
      <div>
      <button onClick={passwordHandler} className='Countinue-btn'>Continue</button>
      </div>
      </div>
      }
    </div>
  );
}

export default App;

