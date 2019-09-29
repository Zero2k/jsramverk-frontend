import 'react-quill/dist/quill.snow.css';
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { withFormik } from 'formik';
import ReactQuill from 'react-quill';

import { ReportSchema } from '../../utils/validation';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2, 0, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    margin: theme.spacing(1)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  editor: {
    padding: theme.spacing(2, 0, 2),
    marginBottom: theme.spacing(3),
    height: '240px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  validation: {
    color: '#ff3838'
  }
}));

const EditForm = props => {
  const {
    values,
    errors,
    status,
    touched,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleSubmit
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          value={values.title}
          onChange={handleChange}
          autoFocus
        />
        {errors.title ? (
          <div className={classes.validation}>{errors.title}</div>
        ) : null}
        {status && status.title ? (
          <div className={classes.validation}>{status.title}</div>
        ) : null}
        <ReactQuill
          className={classes.editor}
          value={values.text}
          onChange={data => {
            setFieldValue('text', data);
          }}
        />
        {errors.text && touched.text ? (
          <div className={classes.validation}>{errors.text}</div>
        ) : null}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={isSubmitting}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default withFormik({
  mapPropsToValues: ({ data }) => ({
    id: '',
    title: '',
    text: '',
    ...data
  }),

  validationSchema: ReportSchema,

  handleSubmit: async (
    values,
    { props, setSubmitting, setStatus, resetForm }
  ) => {
    await props.submit(values);
    resetForm();
    props.onSuccess('/');
    /* if (errors) {
      setStatus(errors);
      setSubmitting(false);
    } else {
      setSubmitting(false);
    } */
  }
})(EditForm);
