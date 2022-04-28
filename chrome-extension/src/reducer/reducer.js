export const reducerFunc=(state,action)=>{
    switch (action.type) {
      case 'set-name':
        return {...state,userName:action.nameValue}
      case 'set-email':
        return {...state,userEmail:action.emailValue}
      case "email-true-showName-false":
        return {...state,isEmail:true,showName:false}
      case "password-true-email-false":
        return {...state,isPassword:true,isEmail:false}
      case "password-false-focus-true":
        return {...state,isPassword:false,focus:true,time:action.timeValue}
      case 'greetings':
        return {...state,greetings:action.greet}
      case 'show-modal':
        return {...state,showModal:!state.showModal}
      default:
        break;
    }
  }