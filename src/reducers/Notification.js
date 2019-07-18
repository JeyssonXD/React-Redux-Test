import {ADD_NOTIFICATION,FETCH_NOTIFICATION,DELETE_NOTIFICATION,DELETE_ALL_NOTIFICATION} from '../types/notificationType';


export default function reducer(state=[], action={}){
    switch(action.type){
        case ADD_NOTIFICATION:
              const index = state.findIndex(x=>x.id===action.notification.id);
              if(index>-1){
                return state;
              }
            return [
              ...state,
              action.notification
            ]
        case DELETE_NOTIFICATION:
            const indexDelete = state.findIndex(x=>x.id===action.id);
            if(indexDelete>-1){
              return state.filter(x=>x.id!==action.id);
            }
            return state;
        case DELETE_ALL_NOTIFICATION:
            state = [];
            return [...state];
        case FETCH_NOTIFICATION:
          return action.notification;
        default: 
            return state;
    }
}