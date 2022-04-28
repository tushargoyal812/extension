import axios from "axios";
const API_KEY="0d75f5a05ca3b4cee287142fefdcc9fc"

  export const getWeather=async(lat,lon,setWeather)=>{
    try {
      const response=await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      console.log(response);
      setWeather(response.data);
    } catch (error) {
      console.log(error);
    }
  }