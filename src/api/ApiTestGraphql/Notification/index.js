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
            fecha
          }
        }
      `;
    }
  },
  mutation:{
    disableNotification: ()=>{
      return gql`
        mutation disabledNotification($filter: disableNotification!){
          disabledNotification(filter: $filter){
            code
            message
            success
            notification{
              id
            }
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
                fecha
            }
        }
        `;
    }
  }
}