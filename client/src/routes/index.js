import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Start from './Start';
import Report from './Report';
import Auth from './Auth';
import RestPassword from './RestPassword';
import NotFound from './NotFound';
import ScrollToTop from '../utils/resetScroll';

import Public from '../components/Layout/Public';

/* const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      (isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
      ))
    }
  />
); */

export default () => (
  <BrowserRouter>
    <ScrollToTop>
      <Switch>
        <Public path="/" exact component={Start} />
        <Public path="/reports/week/:id" exact component={Report} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/forgot" exact component={RestPassword} />
        <Public path="*" component={NotFound} />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>
);
