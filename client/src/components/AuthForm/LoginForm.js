import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOpenOutlined from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { withFormik } from 'formik';

import { LoginSchema } from '../../utils/validation';
import Copyright from '../../utils/copyright';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(4, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    margin: theme.spacing(1)
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  validation: {
    color: '#ff3838'
  }
}));

const LoginForm = props => {
  const {
    toggle,
    values,
    errors,
    status,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOpenOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={values.email}
          onChange={handleChange}
          autoFocus
        />
        {errors.email ? <div className={classes.validation}>{errors.email}</div> : null}
        {status && status.email ? (
          <div className={classes.validation}>{status.email}</div>
        ) : null}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password ? <div className={classes.validation}>{errors.password}</div> : null}
        {status && status.password ? (
          <div className={classes.validation}>{status.password}</div>
        ) : null}
        <FormControlLabel
          control={<Checkbox name="remember" value="remember" checked={values.remember} onChange={handleChange} color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={isSubmitting}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link onClick={toggle} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
          <Grid item>
            <Link href="/forgot" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </form>
    </div>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
    remember: false
  }),

  validationSchema: LoginSchema,

  handleSubmit: async (values, { props, setSubmitting, setStatus, resetForm }) => {
    const errors = await props.submit(values);
    if (errors) {
      setStatus(errors);
      setSubmitting(false);
    } else {
      setSubmitting(false);
      resetForm()
      props.onSuccess('/');
    }
  },
})(LoginForm);
