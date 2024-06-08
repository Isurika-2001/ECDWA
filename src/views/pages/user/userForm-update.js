import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { Button, CardActions, Divider, InputAdornment, Typography, useMediaQuery, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CircularProgress from '@mui/material/CircularProgress';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';

export default function UserForm() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('id');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  useEffect(() => {
    if (userData) {
      console.log('User data:', userData);
      console.log('User name:', userData.name);
    }
  }, [userData]);

  async function fetchUserDetails() {
    try {
      const response = await fetch(`https://33qffjf2y2.execute-api.eu-north-1.amazonaws.com/dev/user?id=${userId}`);
      const data = await response.json();
      setUserData(data.body[0]);
    } catch (error) {
      console.error('Error fetching album data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (values) => {
    setSubmitting(true);
    console.log('Submitting form with values:', values);
    // implement the API call to update the album
    try {
      const response = await fetch('https://33qffjf2y2.execute-api.eu-north-1.amazonaws.com/dev/album', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: userId,
          ...values
        })
      });
      const data = await response.json();
      console.log('User updated:', data);
    } catch (error) {
      console.error('Error updating User:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LinearProgress style={{ marginBottom: '30px' }} />;
  }

  return (
    <>
      <MainCard title="Update User">
        {userData && (
          <Formik
            initialValues={{
              name: userData?.name || '',
              email: userData?.email || ''
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Name is required'),
              email: Yup.string().email('Must be a valid email').required('Email is required')
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
                  </Grid>
                  <Divider sx={{ mt: 3, mb: 2 }} />
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    {/* {submitting && <CircularProgress size={20} color="inherit" /> : } */}
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                      endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                      {'Update User'}
                      {submitting && <CircularProgress size={20} color="inherit" />}
                    </Button>
                  </CardActions>
                </Grid>
              </form>
            )}
          </Formik>
        )}
      </MainCard>
    </>
  );
}
