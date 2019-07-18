import api from '../api/ApiTestGraphql';
//types
import {SET_PERSON,FETCH_PERSON,ADD_PERSON,UPDATE_PERSON,DELETE_PERSON} from '../types/personType';

//#region ReserveName Reducers ***************/

//#region Person *********************/

//#region SET PERSON
export const setPerson = persons =>{
  return {
    type: SET_PERSON,
    persons
  }
}

export const actionSetPerson = persons =>{
  return dispatch=>dispatch(setPerson(persons));
}
//#endregion

//#region ADD PERSON
export const addPerson = person =>{
  return {
    type: ADD_PERSON,
    person
  }
}

export const actionAddPerson = person =>{
    return async function action(dispatch){
      try{
        var res = await api.person.add(person)
        if(res.data.createPerson.code==="CODE1000")
          dispatch(addPerson(res.data.createPerson.person))
        return res;
      }catch(err){
        throw err;
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

export const actionFetchPerson = view =>{
  return async function action(dispatch){
    try{
      console.log("ejecuto");
      var res = await api.person.fetch(view);
      dispatch(fetchPerson(res.data.persons.persons[0]));
      return res;
    }catch(err){
      throw err;
    }
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

export const actionUpdatePerson = person=>{
  return async function action(dispatch){
    try{
      var res = await api.person.edit(person);
      dispatch(updatePerson(person));
      return res;
    }catch(err){
      throw err;
    }
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

export const actionDeletePerson = person =>{
  return async function action(dispatch){
    try{
      var res = await api.person.delete(person);
      dispatch(deletePerson(person.person.id));
      return res;
    }catch(err){
      throw err;
    }
  }
}
//#endregion

//#endregion person*******************/

//#endregion Reservername Reducer/************/


