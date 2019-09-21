import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
}));

const Header = () => {
  const classes = useStyles();

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
              href="/"
              className={classes.link}
            >
              Start
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="/reports/week/1"
              className={classes.link}
            >
              Kmom01
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="/reports/week/2"
              className={classes.link}
            >
              Kmom02
            </Link>
          </nav>
          <Button
            href="/auth"
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            Auth
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
