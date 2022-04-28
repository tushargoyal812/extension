import { useHome } from "../../context/home-content-context/home-content-context"
import { passwordHandler } from "../../utils-func/passwordHandler"
import { weatherHandler } from "../../utils-func/weatherHandler"
import { todoHandler } from "../../utils-func/todoHandler"
import { useWeather } from "../../context/weather-context/weather-context"
import { WeatherModal } from "../weather-modal/weather-modal"
import { TodoModal } from "../todo-modal/todo-modal"
export const MainFocus=()=>{
    const {dispatch,state}=useHome()
    const {weatherModal,setWeatherModal,weather}=useWeather()
    const {showModal,time,greetings,userName}=state
    return(
        <div className='main-focus'>
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
      {showModal&&<TodoModal/>}
      <h1 className='ToDo-button cursor-pointer' onClick={()=>todoHandler(dispatch)}>ToDo</h1>
      </div>
    )
}