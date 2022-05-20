import { useHome } from "../../context/home-content-context/home-content-context"
import { passwordHandler } from "../../utils-func/passwordHandler"

export const ShowPassword=()=>{
    const {dispatch}=useHome()
    return (
        <div>
      <h1 className='main-heading'>{`Enter password`}</h1>
      <input className='detail-input' type="password" />
      <div>
      <button onClick={()=>passwordHandler(dispatch)} className='Countinue-btn cursor-pointer'>Continue</button>
      </div>
      </div>
    )
}