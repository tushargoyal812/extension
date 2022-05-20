export const reducerFunc=(state,action)=>{
    switch (action.type) {
      case 'set-name':
        return {...state,nameOfUser:action.nameValue}
      case 'set-email':
        return {...state,userEmail:action.emailValue}
      case "name-false-focus-true":
        return {...state,showName:false,focus:true,time:action.timeValue}
      case 'greetings':
        return {...state,greetings:action.greet}
      case 'show-modal':
        return {...state,showModal:!state.showModal}
      default:
        return state
    }
  }