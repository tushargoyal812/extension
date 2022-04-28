import { useEffect } from 'react';
import './App.css';
import { useWeather } from './context/weather-context/weather-context';
import { getWeather } from './utils-func/get-weather';
import { ShowName } from './components/showName/showName';
import { useHome } from './context/home-content-context/home-content-context';
import { ShowEmail } from './components/showEmail/showEmail';
import { ShowPassword } from './components/showPassword/showPassword';
import { MainFocus } from './components/mainFocus/mainFocus';
function App() {

  const {setWeather,setGeoLocation,geoLocation}=useWeather()
  const {state}=useHome()
  

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



  const {showName,isEmail,isPassword,focus}=state


  return (
    <div className='extension-container'>
      {showName&&<ShowName/>}
      {isEmail&&<ShowEmail/>}
      {isPassword&&<ShowPassword/>}
      {focus&&<MainFocus/>}
    </div>
  );
}

export default App;

