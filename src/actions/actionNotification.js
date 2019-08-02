import api from '../api/ApiTestGraphql';

//#region DELETE Notification

export const actionDeleteNotification = id =>{
  return async function action(){
    try{
      await api.notification.disabled(id);
    }catch(err){
      throw err;
    }
  }
}
//#endregion

