import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Start from './Start';
import Auth from './Auth';
import RestPassword from './RestPassword';
import NotFound from './NotFound';
import ScrollToTop from '../utils/resetScroll';

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
        <Route path="/" exact component={Start} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/forgot" exact component={RestPassword} />
        <Route path="*" component={NotFound} />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>
);
