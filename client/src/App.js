import React from 'react';
import { Provider } from 'mobx-react';

import { stores } from './stores';

import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './routes';

class App extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <CssBaseline />
        <Routes />
      </Provider>
    );
  }
}

export default App;
