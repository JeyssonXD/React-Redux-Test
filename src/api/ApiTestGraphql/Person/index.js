import gql from 'graphql-tag';

export default {
    mutation:{
       
    },
    query:{
        persons:()=>{
            return gql`query{
                people{
                    id
                    name
                    age
                }
            }`;
        }
    }
}
