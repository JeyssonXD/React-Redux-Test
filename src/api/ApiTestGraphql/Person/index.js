import gql from 'graphql-tag';

export default {
    mutation:{
       createPerson: ()=>{
            return gql`mutation createPerson($person: newPerson!){
                createPerson(person:$person){
                    code
                    message
                    success
                    person{
                        id
                        name
                        age
                        active
                    }
                }
            }`
       },
       updatePerson: ()=>{
           return gql`mutation editPerson($person: editPerson!){
                editPerson(person:$person){
                    code
                    message
                    success
                    person{
                        id
                        name
                        age
                        active
                    }
                }
            }
           `;
       },
       deletePerson: ()=>{
           return gql`mutation deletePerson($person: deletePerson!){
                deletePerson(person:$person){
                code
                message
                success
                }
            }`;
       }
    },
    query:{
        persons:()=>{
            return gql`query{
                            people{
                                id
                                name
                                age
                                active
                            }
                        }`;
        },
        person:()=>{
            return gql`
                query person($id: ID!){
                    person(id:$id){
                        id
                        name
                        age
                        active
                    }
                }
            `;
        }
    }
}
