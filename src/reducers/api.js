import {SAVE_USER} from '../constants/actionTypes';
const initialState = {

}

const api = (state=initialState,action)=>{
    switch(action.type){
    case SAVE_USER:
      return {
        ...state,
        saveUser: action.payload
      };
      default :
       return state;
    };
    
}

export default api;