import React from 'react';
import { Provider } from 'mobx-react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateFnsUtils from '@date-io/date-fns';

import { stores } from './stores';
import Routes from './routes';

class App extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CssBaseline />
          <Routes />
        </MuiPickersUtilsProvider>
      </Provider>
    );
  }
}

export default App;
