import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from "@material-ui/pickers";
import Box from '@material-ui/core/Box';
import LockOutlined from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withFormik } from 'formik';
import { format } from 'date-fns';

import { SignUpSchema } from '../../utils/validation';
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

const SignUpForm = props => {
  const {
    toggle,
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          value={values.username}
          onChange={handleChange}
          autoFocus
        />
        {errors.username ? <div className={classes.validation}>{errors.username}</div> : null}
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
          onBlur={handleBlur}
          autoComplete="email"
        />
        {errors.email && touched.email ? <div className={classes.validation}>{errors.email}</div> : null}
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
          autoComplete="current-password"
        />
        {errors.password && touched.password ? <div className={classes.validation}>{errors.password}</div> : null}
        <DatePicker
          margin="normal"
          required
          fullWidth
          disableFuture
          inputVariant="outlined"
          openTo="year"
          format="dd/MM/yyyy"
          label="Date of birth"
          name="date"
          id="date"
          views={["year", "month", "date"]}
          value={values.date}
          onChange={date => {
            setFieldValue("date", format(date, 'yyyy/MM/dd'));
          }}
          onBlur={handleBlur}
        />
        {errors.date && touched.date ? <div className={classes.validation}>{errors.date}</div> : null}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item xs>
            <Link onClick={toggle} variant="body2">
              {'Already have an account? Sign in'}
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
    username: '',
    email: '',
    password: '',
    date: null,
  }),

  validationSchema: SignUpSchema,

  handleSubmit: async (values, { props, setSubmitting, setErrors }) => {
    setSubmitting(true);
    console.log(values)
  },
})(SignUpForm);
