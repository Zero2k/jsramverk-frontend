import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Header from './Header';
import Footer from './Footer';
import { inject, observer } from 'mobx-react';

@inject('authStore')
@observer
class Private extends React.Component {
  componentDidMount() {
    if(!this.props.authStore.checkToken()) {
      this.props.history.push('/auth');
    }
  }

  render() {
    const { component: Component, authStore, ...rest } = this.props;
    
    return (
      <Route
        {...rest}
        render={(props) => (
          <div>
            <Header />
              <Container component="main">
                <Component {...props} />
              </Container>
            <Footer />
          </div>
        )}
      />
    )
  }
}

export default withRouter(Private);
