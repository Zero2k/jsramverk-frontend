import React from 'react';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { inject, observer } from 'mobx-react';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});


@inject('authStore')
@observer
class Logout extends React.Component {
  componentDidMount() {
      this.props.authStore.logout();
      this.props.history.push('/auth');
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <h2>Logging Out...</h2>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(withRouter(Logout));
