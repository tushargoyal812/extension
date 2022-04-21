import { useState } from 'react';
import './App.css';
import {v4 as uuid} from "uuid";

function App() {  

  const [userName,setUserName]=useState()
  const [userEmail,setUserEmail]=useState("")
  const [isEmail,setIsEmail]=useState(false)
  const [showName,setShowName]=useState(true)
  const [isPassword,setIsPassword]=useState(false)
  const [Time,setTime]=useState()
  const [focus,setFocus]=useState(false)
  const [greeting,setGreeting]=useState()
  let date=new Date()
  let hours=(date.getHours()<10?"0":"")+date.getHours()
  let minutes=(date.getMinutes()<10?"0":'')+date.getMinutes()

  const continueNameHandler=()=>{
    setIsEmail(true)
    setShowName(false)
    }

  const continueEmailHandler=()=>{
    setIsPassword(true)
    setIsEmail(false)
  }

  const passwordHandler=()=>{
    setIsPassword(false)
    setFocus(true)
    setTime(`${hours}:${minutes}`);
    if(hours>5&&hours<12)
    {
      setGreeting("good morning")
    }else if(hours>=12&&hours<5)
    {
      setGreeting("good afternoon")
    }else if(hours<5)
    {
      setGreeting("good evening")
    }
  }


  return (
    <div className='extension-container'>
      {showName&&
      <div>
      <h1 className='main-heading'>Hello,What's your name?</h1>
      <input onChange={(e)=>setUserName(e.target.value)} className='detail-input' type="text" />
      <div>
      <button onClick={continueNameHandler} className='Countinue-btn'>Continue</button>
      </div>
      </div>
      }
      {isEmail&&<div>
      <h1 className='main-heading'>{`What's your email ${userName}`}</h1>
      <input onChange={(e)=>setUserEmail(e.target.value)} className='detail-input' type="text" />
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
      <div className='main-heading extension-time'>{Time}</div>
      <h1 className='main-heading'>{`${greeting} ${userName}`}</h1>
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

