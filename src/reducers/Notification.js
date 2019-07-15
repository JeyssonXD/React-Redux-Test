import {ADD_NOTIFICATION,FETCH_NOTIFICATION} from '../types/notificationType';

export default function reducer(state=[], action={}){
    switch(action.type){
        case ADD_NOTIFICATION:
            return [
              ...state,
              action.notificacion
            ];
        case FETCH_NOTIFICATION:
          return state.notificacion;
        default: 
            return state;
    }
}