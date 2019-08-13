import ApolloClient from 'apollo-boost';
//definition
import schemaAuth from './Authorization';
import schemaPerson from './Person';
import schemaNotification from './Notification';
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
                throw error;
            }
        }
    },
    person:{
        fetch: async(view)=>{
            try{
                return await clientAuth.query({
                    query: schemaPerson.query.persons(),
                    variables:view
                });
            }catch(err){
                throw err;
            }
        },
        add: async(person)=>{
            try{
                return await clientAuth.mutate({
                    mutation:schemaPerson.mutation.createPerson(),
                    variables:person
                });
            }catch(error){
                throw error;
            }
        },
        edit: async(person)=>{
            try{
                return await clientAuth.mutate({
                    mutation: schemaPerson.mutation.updatePerson(),
                    variables:person
                })
            }catch(error){
                throw error;
            }
        },
        delete: async(person)=>{
            try{
                return await clientAuth.mutate({
                    mutation: schemaPerson.mutation.deletePerson(),
                    variables:person
                });
            }catch(error){
                throw error;
            }
        }
    },
    notification:{
        disabled: async(filter)=>{
            try{
                return await clientAuth.mutate({
                    mutation: schemaNotification.mutation.disableNotification(),
                    variables: filter
                });
            }catch(error){
                throw error;
            }
        }
    }
}