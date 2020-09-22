import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import NewContactApp from './NewContactApp';
import ModifyContact from "./ModifyContact";
import ViewContact from "./ViewContact";

ReactDOM.render(
  <BrowserRouter>
    <Route exact path={"/"} component={App}/>
    <Route exact path={"/addNew"} component={NewContactApp}/>
    <Route exact path={"/modify"} render={(props) => <ModifyContact {...props}/>}/>
    <Route exact path={"/view"} render={(props) => <ViewContact {...props}/>}/>
  </BrowserRouter>,
  document.getElementById('root')
);
