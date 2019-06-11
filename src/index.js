import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-router-dom';
import './assets/styles/base.scss';
import 'sweetalert/dist/sweetalert.css';
import Main from './pages/Main';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';
//import {ApolloProvider} from 'react-apollo';
//import ApolloClient from 'apollo-boost';

//api get tokens
import api from './api/ApiTestGraphql';
api.oAuth.sign({credentials:{email:"jeyssonelrobinshut@gmail.com",password:"1234"}}).then((data)=>{
  console.log(data);
});


//store
const store = configureStore();
//tag html
const rootElement = document.getElementById('root');

// Pass your GraphQL endpoint to uri
//const client = new ApolloClient({ uri: 'http://localhost:4000/' });

//oAuth api test graphql


const renderApp = Component => {
  ReactDOM.render(
    //<ApolloProvider client={client}>
      <Provider store={store}>
        <HashRouter>
          <Component />
        </HashRouter>
      </Provider>,
    //</ApolloProvider>,
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

