import ApolloClient from 'apollo-boost';
//definition
import schema from './Authorization';
//config
import config  from './helper/config';

//client as oAuth
const clientAllows = new ApolloClient({ uri: config.developer.URL });

//client with token

export default {
    oAuth:{
        sign: async(credentials)=>{
            try{
                return await clientAllows.mutate({
                    mutation:schema.mutation.oAuth(),
                    variables:credentials
                });
            }catch(error){
                console.log(error);
                throw error;
            }
        }
    }
}