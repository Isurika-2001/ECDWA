import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { Button, CardActions, Divider, InputAdornment, Typography, useMediaQuery, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CircularProgress from '@mui/material/CircularProgress';

export default function GenreForm() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const urlParams = new URLSearchParams(window.location.search);
  const genreID = urlParams.get('id');
  const [loading, setLoading] = useState(true);
  const [genreData, setGenreData] = useState({
    _id: '',
    name: '',
  });

  useEffect(() => {
    // Assuming this is where you fetch the artist data based on the ID
    const fetchGenreDetails = async () => {
      try {
        const response = await fetch(`https://33qffjf2y2.execute-api.eu-north-1.amazonaws.com/dev/genre?id=${genreID}`);
        const data = await response.json();
        setGenreData(data.body[0]);
        console.log('Fetched album data:', data);
      } catch (error) {
        console.error('Error fetching album data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreDetails();
  }, [genreID]);

  if (loading) {
    return <LinearProgress style={{ marginBottom: '30px' }} />;
  }

  return (
    <>
      <MainCard title={genreID ? 'Update Genre' : 'Add New Genre'}>
        <Formik
          enableReinitialize
          initialValues={{
            name: genreData?.name || '',
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log('Submitting form with values:', values);
            setSubmitting(false);
          }}
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
                    {genreID ? 'Update Genre' : 'Add Genre'}
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
