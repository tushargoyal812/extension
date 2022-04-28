import { useHome } from "../../context/home-content-context/home-content-context"
import { continueEmailHandler } from "../../utils-func/continueEmail"

export const ShowEmail=()=>{
    const {dispatch,state}=useHome()
    const {userName}=state
    return(
        <div>
      <h1 className='main-heading'>{`What's your email ${userName}`}</h1>
      <input onChange={(e)=>dispatch({type:"set-email",emailValue:e.target.value})} className='detail-input' type="text" />
      <div>
      <button onClick={()=>continueEmailHandler(dispatch)} className='Countinue-btn cursor-pointer'>Continue</button>
      </div>
      </div>
    )
}