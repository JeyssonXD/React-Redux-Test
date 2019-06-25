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
