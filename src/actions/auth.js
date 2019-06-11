import api from '../api/ApiTestGraphql/Api'

export const getToken = async(credentials)  => async(dispatch) =>
{
    try{
       return  await api.oAuth.sign(credentials);
    }catch(error){
        console.log(error);
        throw  error;
    }
}
