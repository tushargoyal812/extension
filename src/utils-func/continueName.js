export const continueNameHandler=(dispatch,setUserNameState,state)=>{
  const {nameOfUser}=state
  setUserNameState(nameOfUser)
    dispatch({type:"name-false-focus-true"})
}