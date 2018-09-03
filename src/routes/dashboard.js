
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import HomePage from 'views/containers/HomePage/Loadable';
import Login from '../containers/pages/FirstPage';
import SecondPage from '../containers/pages/SecondPage';
// import NotFoundPage from 'views/containers/NotFoundPage/Loadable';

export default function Dashboard() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/second-page" component={SecondPage} />
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </div>
  );
}
