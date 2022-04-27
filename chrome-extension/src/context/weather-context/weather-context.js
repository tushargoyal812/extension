import { createContext,useContext,useState } from "react";


const WeatherContext=createContext()


const WeatherProvider=({children})=>{
    const [geoLocation,setGeoLocation]=useState({latitude:null,longitude:null})
    const [weather,setWeather]=useState()
    return <WeatherContext.Provider value={{geoLocation,setGeoLocation,weather,setWeather}} >{children}</WeatherContext.Provider>
}


const useWeather=()=>useContext(WeatherContext)


export {WeatherProvider,useWeather}