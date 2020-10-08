import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import NewContactApp from './NewContactApp';
import ModifyContact from "./ModifyContact";
import Search from "./Search";

ReactDOM.render(
  <BrowserRouter>
    <Route exact path={"/"} component={App}/>
    <Route exact path={"/addNew"} component={NewContactApp}/>
    <Route exact path={"/modify"} render={(props) => <ModifyContact {...props}/>}/>
    <Route exact path={"/search"} component={Search} />
  </BrowserRouter>,
  document.getElementById('root')
);
