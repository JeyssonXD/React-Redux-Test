import ApolloClient from 'apollo-boost';
//definition
import schema from './Authorization';

//client as oAuth
const clientAllows = new ApolloClient({ uri: "http://localhost:4000/" });

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