import React from 'react';
import { Route } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Header from './Header';
import Footer from './Footer';

const Public = ({ layout: Layout, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <div>
        <Header />
          <Container component="main">
            <Component {...props} />
          </Container>
        <Footer />
      </div>
    )}
  />
);

export default Public;
