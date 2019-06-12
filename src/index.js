import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-router-dom';
import './assets/styles/base.scss';
import 'sweetalert/dist/sweetalert.css';
import Main from './pages/Main';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';
//api config
import api from './api/ApiTestGraphql';
import valid from './api/ApiTestGraphql/helper/validate';
import config from './api/ApiTestGraphql/helper/config';


//api graphql tokens
api.oAuth.sign({credentials:{email:config.developer.UserName,password:config.developer.Password}}).then((data)=>{ 
  var pettry = valid.validateMutation(data,'oAuth','access');
  if(pettry.code==='CODE3000' && pettry.data.active){
      localStorage.ApiTestGraphql=pettry.data.token;
  }else{
    alert("not authenticated api");
  }
}).catch((error)=>{console.log(error)});


//store
const store = configureStore();
//tag html
const rootElement = document.getElementById('root');

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

