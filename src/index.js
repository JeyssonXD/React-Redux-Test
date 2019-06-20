import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/base.scss';
import 'sweetalert/dist/sweetalert.css';
import Main from './pages/Main';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';
//api config
import api from './api/ApiTestGraphql';
import valid from './api/ApiTestGraphql/helper/validate';
import config from './api/ApiTestGraphql/helper/config';
//config apollo client and provider
import  ApolloClient  from 'apollo-boost';
import  {ApolloProvider}  from 'react-apollo';


//api graphql tokens
api.oAuth.sign({credentials:{email:config.developer.UserName,password:config.developer.Password}}).then((data)=>{ 
  var pettry = valid.validateMutation(data,'oAuth','access');
  //CODE3000 token fine
  if(pettry.code==='CODE3000' && pettry.data.active){
      localStorage.ApiTestGraphql=pettry.data.token;
  }else{
    alert("not authenticated api");
    localStorage.removeItem("ApiTestGraphql");

  }
}).catch((error)=>{console.log(error)});

//config apollo client authorizatio
const client = new ApolloClient({
  uri: config.developer.URL,
  request: operation => {
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('ApiTestGraphql')
      }
    });
   },
   onError: ({ networkError, graphQLErrors }) => { 
    if(graphQLErrors){
      for (let err of graphQLErrors) {
        switch(err.extensions.code){
          case 'UNAUTHENTICATED':
            //reload tokens
          break;
          case 'GRAPHQL_VALIDATION_FAILED':
            //query or mutation invalid  
          break;
          default:
            //GRAPHQL_VALIDATION_FAILED
          break;
        }
      }
     }
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});


//store
const store = configureStore();
//tag html
const rootElement = document.getElementById('root');

const renderApp = Component => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>,
    rootElement
  );
};

renderApp(Main);

if (module.hot) {
  module.hot.accept('./pages/Main', () => {
    const NextApp = require('./pages/Main').default
    renderApp(NextApp);
  });
}

registerServiceWorker();

