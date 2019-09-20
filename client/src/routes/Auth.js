import React, { useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from '../components/LoginForm/LoginForm';
import SignUpForm from '../components/SignUpForm/SignUpForm';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
}));

const Auth = props => {
  const { history } = props;
  const [login, setLogin] = useState(true);

  const toggle = () => {
    setLogin(login === true ? false : true);
  };

  const handleBack = () => {
    history.push('/');
  };

  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.header}>
          <IconButton className={classes.button} onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div>
          {login ? (
            <LoginForm toggle={toggle} />
          ) : (
            <SignUpForm toggle={toggle} />
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default withRouter(Auth);
