import api from '../api/ApiTestGraphql';
import {FETCH_NOTIFICATION,DELETE_NOTIFICATION} from '../types/notificationType';

//#region FETCH Notification
const fetchNotifications = notifications =>{
  return {
    type: FETCH_NOTIFICATION,
    notifications
  }
}

export const actionFetchNotification=notifications=>{
  return dispatch =>{
    dispatch(fetchNotifications(notifications));
  }
}
//#region

//#region DELETE Notification
const deleteNofitication = id =>{
  return {
    type: DELETE_NOTIFICATION,
    id
  }
}

export const actionDisabledNotification = filter =>{
  return async function action(dispatch){
    try{
      var res = await api.notification.disabled(filter);
      if(res.data.disabledNotification.code==="CODE4000")
        dispatch(deleteNofitication(res.data.disabledNotification.notification.id))
      return res;
    }catch(err){
      throw err;
    }
  }
}
//#endregion

