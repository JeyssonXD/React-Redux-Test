import api from '../api/ApiTestGraphql';
//types
import {SET_PERSON,FETCH_PERSON,ADD_PERSON,UPDATE_PERSON,DELETE_PERSON} from '../types/personType';

//#region ReserveName Reducers ***************/

//#region Person *********************/

//#region SET PERSON
export const setPerson = person =>{
  return {
    type: SET_PERSON,
    person
  }
}
//#endregion

//#region ADD PERSON
export const addPerson = person =>{
  return {
    type: ADD_PERSON,
    person
  }
}

export const actionAddPerson = async(data) =>{
    return async dispatch=>{
            try{
              var resp = await api.person.add({person:data});
              //code correctly created person
              if(resp.code==='CODE1000'){
                dispatch(addPerson(data.person));
              }
              return resp;
            }catch(error){
              throw error;
            }
          }
}
//#endregion

//#region FETCH PERSON
export const fetchPerson = person =>{
  return {
    type: FETCH_PERSON,
    person
  }
}
//#endregion

//#region UPDATE PERSON
export const updatePerson = person =>{
  return {
    type: UPDATE_PERSON,
    person
  }
}

//#endregion

//#region DELETE GAME
export const deletePerson = id =>{
  return{
    type: DELETE_PERSON,
    id
  }
}
//#endregion

//#endregion person*******************/

//#endregion Reservername Reducer/************/


