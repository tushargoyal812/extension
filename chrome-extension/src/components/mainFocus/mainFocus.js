import { useHome } from "../../context/home-content-context/home-content-context"
import { passwordHandler } from "../../utils-func/passwordHandler"
import { weatherHandler } from "../../utils-func/weatherHandler"
import { todoHandler } from "../../utils-func/todoHandler"
import { useWeather } from "../../context/weather-context/weather-context"
import { WeatherModal } from "../weather-modal/weather-modal"
import { TodoModal } from "../todo-modal/todo-modal"
import './mainFocus.css'
import { useState } from "react"
export const MainFocus=()=>{
    const {dispatch,state}=useHome()
    const {weatherModal,setWeatherModal,weather}=useWeather()
    const {showModal,time,greetings,userName}=state
    const [showCountDown,setShowCountDown]=useState(false)
    const [showAddCountdown,setShowAddCountdown]=useState(false)
    const [addCountdownList,setAddCountdownList]=useState({countdownName:"",countdownDate:""})
    const [countdownList,setCountdownList]=useState([])
    const [showTodayFocus,setShowTodayFocus]=useState(true)
    const [todayFocusInput,setTodayFocusInput]=useState()
    const [todayFocus,setTodayFocus]=useState(false)
    const [doneTodayFocus,setDoneTodayFocus]=useState(false)

    const countDownHandler=()=>{
      showCountDown?setShowCountDown(false):setShowCountDown(true)
    }

    const AddCountdownHandler=()=>{
      showAddCountdown?setShowAddCountdown(false):setShowAddCountdown(true)
    }

    const removeAddCountHandler=()=>{
      setShowAddCountdown(false)
    }

    const addCountdownListHandler=()=>{
      setCountdownList([...countdownList,addCountdownList])
    }

    const mainFocusHandler=()=>{
      setShowTodayFocus(false)
      setTodayFocus(true)
    }
    return(
        <div className='main-focus'>
      <div className='extension-time'>{time}</div>
      <h1 className='main-heading'>{`${greetings} ${userName}`}</h1>
      {todayFocus&&<div className="today-focus">
        <span>
        <input onChange={()=>doneTodayFocus?setDoneTodayFocus(false):setDoneTodayFocus(true)} type="checkbox" name="" id="" />
        </span>
        <span>
        <div style={{textDecoration:doneTodayFocus?"line-through":"none",color:"white"}}>{todayFocusInput}</div>
        </span>
      </div>}
      {doneTodayFocus&&<div>good work!</div>}
      {showTodayFocus&&<div>
      <div className='main-heading'>What's your main focus for today?</div>
      <input onChange={(e)=>setTodayFocusInput(e.target.value)} className='detail-input' type="text" />
      <div>
      <button onClick={mainFocusHandler} className='Countinue-btn cursor-pointer'>Continue</button>
      </div>
      </div>}
      <div onClick={()=>weatherHandler(weatherModal,setWeatherModal)} className='weather cursor-pointer'>
        <div>{weather.main.temp.toFixed()}</div>
        <div>{weather.name}</div>
        <div className='degree-symbol'>°</div>
      </div>
      {weatherModal&&<WeatherModal/>}
      {showModal&&<TodoModal/>}
      {showCountDown&&<div className="count-down-container">
        <div className="count-down-modal">
          <div className="add-count-down"><span class="material-symbols-outlined">calendar_month</span><span>countdowns</span><span onClick={AddCountdownHandler} class="material-symbols-outlined cursor-pointer">add</span></div>
          {countdownList.map(item=><div>
            <div>{item.countdownName}</div>
            <div>{item.countdownDate}</div>
          </div>)}
        </div>
      </div>}
      {showAddCountdown&&<div className="add-countdown-container">
        <div className="add-countdown-modal">
          <div><span onClick={removeAddCountHandler} class="material-symbols-outlined cursor-pointer">keyboard_backspace</span></div>
          <div className="my-1">
            <div>Name</div>
            <input onChange={(e)=>setAddCountdownList({...addCountdownList,countdownName:e.target.value})} type="text" />
          </div>
          <div className="my-1">
            <div>Date</div>
            <input onChange={(e)=>setAddCountdownList({...addCountdownList,countdownDate:e.target.value})} type="date" />
          </div>
          <div>
            <button onClick={addCountdownListHandler} className="cursor-pointer">Create</button>
          </div>
        </div>
      </div>}
      <div className="count-down-btn cursor-pointer" onClick={countDownHandler}><span class="material-symbols-outlined add-icon">add_circle</span>
      <div>Add</div></div>
      <h1 className='ToDo-button cursor-pointer' onClick={()=>todoHandler(dispatch)}>ToDo</h1>
      </div>
    )
}