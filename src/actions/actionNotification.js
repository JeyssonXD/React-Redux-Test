//types
import {ADD_NOTIFICATION,DELETE_NOTIFICATION,DELETE_ALL_NOTIFICATION} from '../types/notificationType';

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

//#region DELETE Notification

export const deleteNotification = id =>{
  return {
    type: DELETE_NOTIFICATION,
    id
  }
}

export const actionDeleteNotification = id =>{
  return dispatch=>dispatch(deleteNotification(id));
}
//#endregion

//#region DELETE ALL Notification
export const deleteALLNotification = () =>{
  return {
    type : DELETE_ALL_NOTIFICATION
  }
}

export const actionDeleteAllNotification = () =>{
  return dispatch => dispatch(deleteALLNotification);
}
//#endregion
