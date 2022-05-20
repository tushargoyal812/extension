import { useEffect } from 'react';
import './App.css';
import { useWeather } from './context/weather-context/weather-context';
import { getWeather } from './utils-func/get-weather';
import { ShowName } from './components/showName/showName';
import { useHome } from './context/home-content-context/home-content-context';
import { MainFocus } from './components/mainFocus/mainFocus';
function App() {

  const {setWeather,setGeoLocation,geoLocation}=useWeather()
  const {userNameState}=useHome()
  

  useEffect(()=>{
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
    navigator.geolocation.getCurrentPosition(success, error, options);
  },[geoLocation,setGeoLocation])


  useEffect(()=>{
    getWeather(geoLocation.latitude,geoLocation.longitude,setWeather)
  },[geoLocation.latitude,geoLocation.longitude,setWeather])


  console.log(userNameState,"state");
  useEffect(()=>{
    console.log("useEffect chala");
    localStorage.setItem("userName",userNameState)
  },[userNameState])




  return (
    <div className='extension-container'>
      {userNameState?<MainFocus/>:<ShowName/>}
    </div>
  );
}

export default App;

