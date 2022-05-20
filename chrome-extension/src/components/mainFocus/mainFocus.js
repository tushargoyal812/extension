import { useHome } from "../../context/home-content-context/home-content-context"
import { weatherHandler } from "../../utils-func/weatherHandler"
import { todoHandler } from "../../utils-func/todoHandler"
import { useWeather } from "../../context/weather-context/weather-context"
import { WeatherModal } from "../weather-modal/weather-modal"
import { TodoModal } from "../todo-modal/todo-modal"
import './mainFocus.css'
import {v4 as uuid} from 'uuid'
import { useState,useEffect } from "react"
// import { useTodo } from "../../context/todo-context/todo-context"
export const MainFocus=()=>{
    const {dispatch,state,userNameState}=useHome()
    // const {todoValues,setTodoValues}=useTodo()
    const {weatherModal,setWeatherModal,weather}=useWeather()
    const {showModal}=state
    const [showCountDown,setShowCountDown]=useState(false)
    const [showAddCountdown,setShowAddCountdown]=useState(false)
    const [addCountdownList,setAddCountdownList]=useState({countdownName:"",countdownDate:"",countdownTime:""})
    const [countdownList,setCountdownList]=useState(()=>{
      const eventDeatils=localStorage.getItem("events")
      if(eventDeatils){
        return JSON.parse(eventDeatils)
      }else{
        return []
      }
    })

    const [todayFocusInput,setTodayFocusInput]=useState()
    const [doneTodayFocus,setDoneTodayFocus]=useState(false)
    const [leftTime,setLeftTime]=useState()
    const [greet,setGreet]=useState()
    const [focusState,setFocusState]=useState(()=>{
      const saved=localStorage.getItem("focus")
      if(saved){
       return saved
      }
    })
    const [hour,setHour]=useState()
    const [minutes,setMinutes]=useState()

    const countDownHandler=()=>{
      showCountDown?setShowCountDown(false):setShowCountDown(true)
    }

    const AddCountdownHandler=()=>{
      showAddCountdown?setShowAddCountdown(false):setShowAddCountdown(true)
    }

    const removeAddCountHandler=()=>{
      setShowAddCountdown(false)
    }


    const countDown=(date,time)=>{
      let totalTime=date+" "+time
        var countDownDate = new Date(totalTime).getTime();

        var now = new Date().getTime();
      
        var distance = countDownDate - now;
      
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      
        if (distance < 0) {
          return "timer expired"
        }else{
          return `${days}d ${hours}h ${minutes}m`
        }
    }

    
    useEffect(() => {
      setInterval(()=>{
      setLeftTime(new Date())
    },1000)
    }, [leftTime])

    const addCountdownListHandler=()=>{
      setCountdownList([...countdownList,{...addCountdownList,id:uuid()}])
      setAddCountdownList({...addCountdownList,countdownName:"",countdownDate:"",countdownTime:""})
    }



    useEffect(()=>{
      localStorage.setItem("events",JSON.stringify(countdownList))
    },[countdownList])




    const mainFocusHandler=()=>{
      setFocusState(todayFocusInput)
    }

    const removeTodayFocus=()=>{
      localStorage.removeItem("focus")
      setFocusState("")
    }

    const deleteEvent=(id)=>{
      let remainingTodo=countdownList.filter(item=>item.id!==id)
      setCountdownList(remainingTodo)
    }

    useEffect(()=>{
      let hours=new Date().getHours()
      let minute=new Date().getMinutes()
      if(hours<10)
      {
        setHour(`0${hours}`)
      }else{
        setHour(hours)
      }
      if(minute<10)
      {
        setMinutes(`0${minute}`)
      }else{
        setMinutes(minute)
      }
      if(new Date().getHours()>5&&new Date().getHours<12)
      {
        setGreet("Good Morning")
      }else if(new Date().getHours()>=12&&new Date().getHours()<17)
      {
        setGreet("Good Afternoon")
      }else if(new Date().getHours()>=17)
      {
        setGreet("Good Evening")
      }
    },[new Date()])


    useEffect(()=>{
      focusState&&localStorage.setItem("focus",focusState)
    },[focusState])


    return(
      <>
      <div className='main-focus'>
        <div className='extension-time'>{`${hour}:${minutes}`}</div>
      <h1 className='main-heading'>{`${greet} ${userNameState}`}</h1>
      {focusState?<div className="today-focus">
        <span>
        <input onChange={()=>doneTodayFocus?setDoneTodayFocus(false):setDoneTodayFocus(true)} type="checkbox" name="" id="" />
        </span>
        <span>
        <div style={{textDecoration:doneTodayFocus?"line-through":"none",color:"white"}}>{focusState}</div>
        </span>
        <span>
        <span onClick={removeTodayFocus} class="material-symbols-outlined today-focus-delete cursor-pointer">close</span>
        </span>
      </div>:<div>
      <div className='main-heading'>What's your main focus for today?</div>
      <input onChange={(e)=>setTodayFocusInput(e.target.value)} className='detail-input' type="text" />
      <div>
      <button onClick={mainFocusHandler} className='Countinue-btn cursor-pointer'>Continue</button>
      </div>
      </div>}
      {doneTodayFocus&&<div className="good-work">good work!</div>}
      {
        weather&&<div onClick={()=>weatherHandler(weatherModal,setWeatherModal)} className='weather cursor-pointer'>
        <div>{weather.main.temp.toFixed()}</div>
        <div>{weather.name}</div>
        <div className='degree-symbol'>°</div>
      </div>
      }
      {weatherModal&&<WeatherModal/>}
      {showModal&&<TodoModal/>}
      {showCountDown&&<div className="count-down-container">
        <div className="count-down-modal">
          <div className="add-count-down"><span class="material-symbols-outlined">calendar_month</span><span>countdowns</span><span onClick={AddCountdownHandler} class="material-symbols-outlined cursor-pointer">add</span></div>
          <hr />
          {countdownList.map(item=>{
            const passDateTime=countDown(item.countdownDate,item.countdownTime)
            return(
            <div key={item.id}>
              <div className="countdown-details">
              <div>
                <div>{item.countdownName}</div>
                <div>{item.countdownDate}</div>
                <div>{passDateTime} left</div>
              </div>
              <div>
            <span onClick={()=>deleteEvent(item.id)} class="material-symbols-outlined cursor-pointer">delete</span>
              </div>
              </div>
            <hr />
          </div>
            )
          })}
        </div>
      </div>}
      {showAddCountdown&&<div className="add-countdown-container">
        <div className="add-countdown-modal">
          <div className="backspace"><span onClick={removeAddCountHandler} class="material-symbols-outlined cursor-pointer ">keyboard_backspace</span><span className="ml-2">Add Countdown</span></div>
          <div className="my-1">
            <div>Name</div>
            <input value={addCountdownList.countdownName} className="countdown-name" onChange={(e)=>setAddCountdownList({...addCountdownList,countdownName:e.target.value})} type="text" autoFocus/>
          </div>
          <div className="my-1">
            <div>Date</div>
            <input value={addCountdownList.countdownDate} onChange={(e)=>setAddCountdownList({...addCountdownList,countdownDate:e.target.value})} type="date" />
          </div>
          <div className="my-1">
            <div>Time</div>
            <input value={addCountdownList.countdownTime} onChange={(e)=>setAddCountdownList({...addCountdownList,countdownTime:e.target.value})} type="time" />
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
      </>
    )
}

