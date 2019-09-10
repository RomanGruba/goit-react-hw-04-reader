import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import publications from './Components/publications.json';
import App from './Components/App';

ReactDOM.render(
  <HashRouter>
    <App items={publications} />
  </HashRouter>,
  document.getElementById('root'),
);
