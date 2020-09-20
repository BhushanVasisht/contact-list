import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NewContactApp from './NewContactApp';
import { BrowserRouter, Route } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Route exact path={"/"} component={App}/>
    <Route exact path={"/addNew"} component={NewContactApp}/>
  </BrowserRouter>,
  document.getElementById('root')
);
