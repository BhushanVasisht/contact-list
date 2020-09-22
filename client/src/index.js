import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NewContactApp from './NewContactApp';

import { BrowserRouter, Route } from 'react-router-dom'
import ModifyContact from "./ModifyContact";

ReactDOM.render(
  <BrowserRouter>
    <Route exact path={"/"} component={App}/>
    <Route exact path={"/addNew"} component={NewContactApp}/>
    <Route exact path={"/modify"} render={(props) => <ModifyContact {...props}/>}/>
  </BrowserRouter>,
  document.getElementById('root')
);
