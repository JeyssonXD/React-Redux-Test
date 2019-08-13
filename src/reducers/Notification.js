import {FETCH_NOTIFICATION,DELETE_NOTIFICATION} from '../types/notificationType';

export default function reducer(state=[], action={}){
  switch(action.type){
      case DELETE_NOTIFICATION:
          const indexDelete = state.findIndex(x=>x.id===action.id);
          if(indexDelete>-1){
            return state.filter(x=>x.id!==action.id);
          }
          return state;
      case FETCH_NOTIFICATION:
        return action.notifications;
      default: 
          return state;
  }
}