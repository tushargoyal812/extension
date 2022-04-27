import { useReducer,useEffect, useState } from 'react';
import './App.css';
import {v4 as uuid} from "uuid";
import { WeatherModal } from './components/weather-modal/weather-modal';
import { useWeather } from './context/weather-context/weather-context';
import { weatherHandler } from './utils-func/weatherHandler';
import { getWeather } from './utils-func/get-weather';
import { reducerFunc } from './reducer/reducer';
import { continueNameHandler } from './utils-func/continueName';
import { continueEmailHandler } from './utils-func/continueEmail';
import { passwordHandler } from './utils-func/passwordHandler';
function App() {

  const {weather,setWeather,setGeoLocation,geoLocation}=useWeather()

  const initilaState={userName:"",userEmail:"",showName:true,isEmail:false,isPassword:false,time:null,focus:false,greetings:"",showModal:false}

  const [state,dispatch]=useReducer(reducerFunc,initilaState)
  const [todoInput,setTodoInput]=useState()
  const [todoValues,setTodoValues]=useState([])
  const [weatherModal,setWeatherModal]=useState(false)

  const addHandler=(value)=>{
    setTodoValues([...todoValues,{id:uuid(),todoName:value,isDone:false}])
  setTodoInput("")
}

  const todoInputHandler=(id)=>{
  let newTodo=todoValues.map(item=>item.id===id?{...item,isDone:!item.isDone}:item)
  setTodoValues(newTodo)
}
  

  const todoHandler=()=>{
    dispatch({type:"show-modal"})
  }

  const cancelHandler=(id)=>{
    setTodoValues(todoValues.filter(item=>item.id!==id))
  }


  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    var crd = pos.coords;
  
    setGeoLocation({...geoLocation,latitude:crd.latitude,longitude:crd.longitude})
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  


  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(success, error, options);
  },[])


  useEffect(()=>{
    getWeather(geoLocation.latitude,geoLocation.longitude,setWeather)
  },[geoLocation.latitude,geoLocation.longitude])



  const {showName,isEmail,userName,isPassword,focus,time,greetings,showModal}=state


  return (
    <div className='extension-container'>
      {showName&&
      <div>
      <h1 className='main-heading'>Hello,What's your name?</h1>
      <input onChange={(e)=>dispatch({type:"set-name",nameValue:e.target.value})} className='detail-input' type="text" />
      <div>
      <button onClick={()=>continueNameHandler(dispatch)} className='Countinue-btn cursor-pointer'>Continue</button>
      </div>
      </div>
      }
      {isEmail&&<div>
      <h1 className='main-heading'>{`What's your email ${userName}`}</h1>
      <input onChange={(e)=>dispatch({type:"set-email",emailValue:e.target.value})} className='detail-input' type="text" />
      <div>
      <button onClick={()=>continueEmailHandler(dispatch)} className='Countinue-btn cursor-pointer'>Continue</button>
      </div>
      </div>
      }
      {isPassword&&<div>
      <h1 className='main-heading'>{`Enter password`}</h1>
      <input className='detail-input' type="password" />
      <div>
      <button onClick={()=>passwordHandler(dispatch)} className='Countinue-btn cursor-pointer'>Continue</button>
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
      <div onClick={()=>weatherHandler(weatherModal,setWeatherModal)} className='weather cursor-pointer'>
        <div>{weather.main.temp.toFixed()}</div>
        <div>{weather.name}</div>
        <div className='degree-symbol'>°</div>
      </div>
      {weatherModal&&<WeatherModal/>}
      {showModal&&<div className='ToDo-modal-container'>
        <div className='ToDo-modal'>
          {todoValues.map(item=><div key={item.id}>
            <div className='todo-container'>
            <input onChange={()=>todoInputHandler(item.id)} type="checkbox" name="" id="" /><span className='todo-names' style={{textDecoration:item.isDone?"line-through":"none"}}>{item.todoName}</span><span class="material-symbols-rounded">edit</span><span onClick={()=>cancelHandler(item.id)} class="material-symbols-rounded cursor-pointer">close</span>
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

