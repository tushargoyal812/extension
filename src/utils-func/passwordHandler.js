let date=new Date()
let hours=(date.getHours()<10?"0":"")+date.getHours()
let minutes=(date.getMinutes()<10?"0":'')+date.getMinutes()
export const passwordHandler=(dispatch)=>{
    dispatch({type:"password-false-focus-true",timeValue:`${hours}:${minutes}`})
    if(hours>5&&hours<12)
    {
      dispatch({type:"greetings",greet:"good morning"})
    }else if(hours>=12&&hours<17)
    {
      dispatch({type:"greetings",greet:"good afternoon"})
    }else if(hours<5)
    {
      dispatch({type:"greetings",greet:"good evening"})
    }
  }