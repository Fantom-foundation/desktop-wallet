
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import HomePage from 'views/containers/HomePage/Loadable';
import Login from '../containers/pages/FirstPage';
import SecondPage from '../containers/pages/SecondPage';
// import NotFoundPage from 'views/containers/NotFoundPage/Loadable';
// import { Router, Route, browserHistory } from 'react-router';
export default function Dashboard() {
  return (
      <Switch>
        <Route path="/" component={Login} />
        
        <Route path="/secondPage" component={SecondPage} />
        
      </Switch>
  );
}
