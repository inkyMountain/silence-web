import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './GlobalStyles';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App className={'App'}/>
    <GlobalStyle/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
