import gql from 'graphql-tag';

export default {
  query : {
    notifications : ()=>{
      return gql`
        query notifications{
          notifications{
            id
            text
            link
            enable
          }
        }
      `;
    }
  },
  mutation:{
    disableNotification: ()=>{
      return gql`
        query notification($id: id!){
          notification(id: $id){
            code
            message
            success
          }
        }
      `;
    } 
  },
  subscription:{
    notification:()=>{
        return gql`
        subscription {
            notification{
                id
                text
                link
                enable
            }
        }
        `;
    }
  }
}