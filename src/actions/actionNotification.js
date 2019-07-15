//types
import {ADD_NOTIFICATION} from '../types/notificationType';

//#region ADD Notification
export const addNotification = notification =>{
  return {
    type: ADD_NOTIFICATION,
    notification
  }
}

export const actionAddNotification = notification =>{
  return dispatch=>dispatch(addNotification(notification));
}
//#endregion