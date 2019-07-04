import {ADD_PERSON,SET_PERSON,FETCH_PERSON,UPDATE_PERSON} from '../types/personType';

export default function reducer(state=[], action={}){
    switch(action.type){
        case SET_PERSON:
            return action.persons;
        case FETCH_PERSON:
            const index = state.findIndex(x=>x.id===action.person.id);
            if(index>-1){
                return state.map(x=>{
                    if(x.id===action.person.id) return action.person;
                    return x;
                });
            }else{
                return [
                ...state,
                action.person
                ]
            }
        case ADD_PERSON:
            return [
              ...state,
              action.person
            ];
        case UPDATE_PERSON:
            return state.map(item=>{
                if(item.id===action.person.id)return action.person;
                return item;
            });
        default: 
            return state;
    }
}