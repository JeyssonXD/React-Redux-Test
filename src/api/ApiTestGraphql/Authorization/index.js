import gql from 'graphql-tag';

export default {
    mutation:{
        oAuth:()=>{
              return gql`mutation oAuth($credentials: credentials){
                oAuth(credentials:$credentials){
                    code
                    message
                    success
                    access{
                        token
                        active
                    }
                }
            }`;
        }
    },
    query:{

    }
}
