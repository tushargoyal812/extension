import { useWeather } from "../../context/weather-context/weather-context";

export const WeatherModal=()=>{
    const {weather}=useWeather()
    
    
      
    return(
        <div className='weather-modal-container'>
        <div className='weather-modal'>
          <div className='location-container'>
          <div>{weather.name}</div>
          <div>{weather.weather[0].description}</div>
          </div>
          <div className='modal-temp'>
          <h1>{weather.main.temp.toFixed()}</h1>
          <div className='degree-symbol-modal'>°</div>
          </div>
          <div className='weather-details'>
            <div>Humidity:{weather.main.humidity}</div>
            <div>Wind Speed:{weather.wind.speed}</div>
            <div>Sea Level:{weather.main.sea_level}</div>
          </div>
        </div>
      </div>
    )
}