import gql from 'graphql-tag';

export default {
    mutation:{
       createPerson: ()=>{
            return gql`mutation createdPerson($person: person){
                createPerson(person:$person){
                    code
                    message
                    success{
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
        }
    }
}
