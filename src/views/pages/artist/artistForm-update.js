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

export default function AlbumForm() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const urlParams = new URLSearchParams(window.location.search);
  const artistId = urlParams.get('id');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [artistData, setArtistData] = useState(null);

  useEffect(() => {
    fetchArtistDetails();
  }, [artistId]);

  useEffect(() => {
    if (artistData) {
      console.log('Artist data:', artistData);
      console.log('Artist name:', artistData.name);
    }
  }, [artistData]);

  async function fetchArtistDetails() {
    try {
      const response = await fetch(`https://33qffjf2y2.execute-api.eu-north-1.amazonaws.com/dev/artist?id=${artistId}`);
      const data = await response.json();
      setArtistData(data.body[0]);
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
          id: artistId,
          ...values
        })
      });
      const data = await response.json();
      console.log('Album updated:', data);
    } catch (error) {
      console.error('Error updating album:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LinearProgress style={{ marginBottom: '30px' }} />;
  }

  return (
    <>
      <MainCard title="Update Artist">
        {artistData && (
          <Formik
            initialValues={{
              name: artistData?.name || '',
              avatar: artistData?.avatar || ''
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Name is required'),
              avatar: Yup.string().required('Album art is required')
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
                      {'Update Artist'}
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
