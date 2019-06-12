export default {
    validateMutation:  (response,objectType,dataType)=>{
        var data = {};
        //error defined
        if(response.error!=null){
            data['message'] = "went wrong, sorry, can be network api external - ERROR";
            data['success'] = false;
            data['code'] = response.error.errors[0].extensions.code
            data['data'] = null;
        }else{
            //data defined
            if(response.data!=null){
                data['message'] = response.data[objectType].message;
                data['success'] = response.data[objectType].success;
                data['code'] = response.data[objectType].code;
                data['data'] = response.data[objectType][dataType];
            }
        }
        return data;
    }
}