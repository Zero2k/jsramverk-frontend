import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Start from './Start';
import ViewReport from './Report/View';
import EditReport from './Report/Edit';
import Auth from './Auth';
import RestPassword from './RestPassword';
import Logout from './Logout';
import NotFound from './NotFound';
import ScrollToTop from '../utils/resetScroll';

import Public from '../components/Layout/Public';
import Private from '../components/Layout/Private';

export default () => (
  <BrowserRouter>
    <ScrollToTop>
      <Switch>
        <Public path="/" exact component={Start} />
        <Private path="/reports/week/:id" exact component={ViewReport} />
        <Private path="/reports/edit/:id" exact component={EditReport} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/forgot" exact component={RestPassword} />
        <Route path="/logout" exact component={Logout} />
        <Public path="*" component={NotFound} />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>
);
