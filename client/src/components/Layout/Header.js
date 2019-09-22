import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { inject } from 'mobx-react';

const styles = theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: 'wrap'
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  }
});

@inject('authStore')
class Header extends React.Component {
  render() {
    const { classes, authStore } = this.props;
    return (
      <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Me App
          </Typography>
          <nav>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink} to="/"
              className={classes.link}
            >
              Start
            </Link>
          </nav>
          {authStore.checkAuth ? (
          <nav>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink} to="/reports/week/1"
              className={classes.link}
            >
              Kmom01
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink} to="/reports/week/2"
              className={classes.link}
            >
              Kmom02
            </Link>
          </nav>
          ) : null}
          <Button
            color="primary"
            variant="outlined"
            component={RouterLink} to="/auth"
            className={classes.link}
          >
            Auth
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
    )
  }
}

export default withStyles(styles)(Header);
