import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { Button, CardActions, Divider, InputAdornment, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LinkIcon from '@mui/icons-material/Link';
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

export default function ArtistForm() {
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
      <MainCard
        title="Add New Artist"
      >
        <Formik
          initialValues={{
            name: '',
            avatar: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required'),
            avatar: Yup.string().required('Avatar is required')
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form onSubmit={handleSubmit}>
              <Grid container direction="column" justifyContent="center">
                <Grid container sx={{ p: 3 }} spacing={matchDownSM ? 0 : 2}>
                  <Grid item xs={12} sm={12}>
                    <img
                      src={
                        values.avatar
                          ? values.avatar
                          : 'https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1714026529~exp=1714030129~hmac=960020c35bd83c0ebc212809a465f1ae9037f507a11706a1e01514de8f943206&w=740'
                      }
                      alt={values.name}
                      style={{
                        width: 200, // Adjust width and height for desired size
                        height: 200,
                        borderRadius: '50%', // Create a circle
                        objectFit: 'cover' // Ensure image fills the circle
                      }}
                    />
                  </Grid>
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
                      Avatar
                    </Typography>
                    <TextField
                      fullWidth
                      margin="normal"
                      name="avatar"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.avatar}
                      error={Boolean(touched.avatar && errors.avatar)}
                      helperText={touched.avatar && errors.avatar}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LinkIcon />
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
                    {'Add Artist'}
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
