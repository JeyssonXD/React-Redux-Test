import ApolloClient from 'apollo-boost';
//definition
import schemaAuth from './Authorization';
import schemaPerson from './Person';
//config
import config  from './helper/config';

//client as oAuth
const clientAllows = new ApolloClient({ uri: config.developer.URL });

//client with token
const clientAuth = new ApolloClient({uri: config.developer.URL,
    request: operation => {
      operation.setContext({
        headers: {
          authorization: localStorage.getItem('ApiTestGraphql')
        }
      });
     }});

export default {
    oAuth:{
        sign: async(credentials)=>{
            try{
                return await clientAllows.mutate({
                    mutation:schemaAuth.mutation.oAuth(),
                    variables:credentials
                });
            }catch(error){
                console.log(error);
                throw error;
            }
        }
    },
    person:{
        add: async(person)=>{
            try{
                return await clientAuth.mutate({
                    mutation:schemaPerson.mutation.createPerson(),
                    variables:person
                });
            }catch(error){
                console.log(error);
                throw error;
            }
        }
    }
}