import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { Button, CardActions, Divider, InputAdornment, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';
// import TextareaAutosize from '@mui/material/TextareaAutosize';
// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
// import config from '../../../config';
// import CodeIcon from '@mui/icons-material/Code';
// import { Field } from 'formik';
// import { useAuthContext } from '../../../context/useAuthContext';
// import { useLogout } from '../../../hooks/useLogout';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
import CircularProgress from '@mui/material/CircularProgress';

export default function UserForm() {
  // const { user } = useAuthContext();
  const theme = useTheme();
  // const { logout } = useLogout();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  // const navigate = useNavigate();
  // const urlParams = new URLSearchParams(window.location.search);

  // const Toast = withReactContent(
  //   Swal.mixin({
  //     toast: true,
  //     position: 'bottom-end',
  //     iconColor: 'white',
  //     customClass: {
  //       popup: 'colored-toast'
  //     },
  //     showConfirmButton: false,
  //     timer: 3500,
  //     timerProgressBar: true
  //   })
  // );

  // const showSuccessSwal = () => {
  //   Toast.fire({
  //     icon: 'success',
  //     title: 'Course Details Saved Successfully.'
  //   });
  // };

  // // error showErrorSwal
  // const showErrorSwal = () => {
  //   Toast.fire({
  //     icon: 'error',
  //     title: 'Error While Saving Course Details.'
  //   });
  // };

  // const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
  const handleSubmit = async () => {
    console.log('Submitting form with values:');

    // const formData = {
    //   name: values.name,
    //   description: values.description,
    //   rate: values.rate,
    //   code: values.code
    // };

    // try {
    //   const url = config.apiUrl + `api/course-form-add-new`;

    //   const method = 'POST';

    //   console.log('Submitting request to:', url);
    //   const res = await fetch(url, {
    //     method,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${user.token}`
    //     },
    //     body: JSON.stringify(formData)
    //   });
    //   if (!res.ok) {
    //     if (res.status === 401) {
    //       console.error('Unauthorized access. Logging out.');
    //       logout();
    //     }

    //     if (res.status === 500) {
    //       console.error('Internal Server Error.');
    //       logout();
    //       return;
    //     }
    //     return;
    //   }

    //   console.log('Request complete.');
    //   const response = await res.json();
    //   console.log('Server response:', response);

    //   // Display success messages
    //   showSuccessSwal();
    // } catch (error) {
    //   // Set error message
    //   console.error('Error submitting form:', error);
    //   showErrorSwal();

    //   // Set formik errors
    //   setFieldError('submit', error.message);
    // } finally {
    //   // Always set submitting to false, regardless of success or failure
    //   setSubmitting(false);
    // }
  };

  return (
    <>
      <MainCard title="Add New User">
        <Formik
          initialValues={{
            name: '',
            email: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            role: Yup.string().required('Role is required'),
            password: Yup.string().required('Password is required')
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form onSubmit={handleSubmit}>
              <Grid container direction="column" justifyContent="center">
                <Grid container sx={{ p: 3 }} spacing={matchDownSM ? 0 : 2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h5" component="h5">
                      Name
                    </Typography>
                    <TextField
                      fullWidth
                      margin="normal"
                      name="name"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AssignmentIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h5" component="h5">
                      Email
                    </Typography>
                    <TextField
                      fullWidth
                      margin="normal"
                      name="email"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AssignmentIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  {/* select box for user role */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h5" component="h5">
                      Role
                    </Typography>
                    <TextField
                      fullWidth
                      margin="normal"
                      name="role"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.role}
                      error={Boolean(touched.role && errors.role)}
                      helperText={touched.role && errors.role}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AssignmentIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h5" component="h5">
                      Password
                    </Typography>
                    <TextField
                      fullWidth
                      margin="normal"
                      name="password"
                      type="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AssignmentIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Divider />
                </Grid>
                <Divider sx={{ mt: 3, mb: 2 }} />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                  >
                    {'Add User'}
                  </Button>
                </CardActions>
              </Grid>
            </form>
          )}
        </Formik>
      </MainCard>
    </>
  );
}
