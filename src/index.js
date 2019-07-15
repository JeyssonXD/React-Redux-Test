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
//import  ApolloClient  from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
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

//Create an http link
const httpLink = createHttpLink({
  uri: config.developer.URL,
});

//Create a WebSocket link
const wsLink = new WebSocketLink({
  uri: config.developer.WS,
  options: {
    reconnect: true,
    lazy:true,
    connectionParams: async () => {
      return {
          authorization: localStorage.getItem('ApiTestGraphql')
      }
    },
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('ApiTestGraphql')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ,
    }
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

//setup client
const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
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

