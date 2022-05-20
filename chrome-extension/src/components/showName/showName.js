import { useHome } from "../../context/home-content-context/home-content-context"
import { continueNameHandler } from "../../utils-func/continueName"
export const ShowName=()=>{
  const {state,dispatch,setUserNameState}=useHome()
    return (
      <>
        <div>
      <h1 className='main-heading'>Hello,What's your name?</h1>
      <input onChange={(e)=>dispatch({type:"set-name",nameValue:e.target.value})} className='detail-input' type="text" />
      <div>
      <button onClick={()=>continueNameHandler(dispatch,setUserNameState,state)} className='Countinue-btn cursor-pointer'>Continue</button>
      </div>
      </div>
      </>
    )
}