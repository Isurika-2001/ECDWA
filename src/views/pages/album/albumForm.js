import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { Button, CardActions, Divider, InputAdornment, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';
// import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import LinkIcon from '@mui/icons-material/Link';
// import TextareaAutosize from '@mui/material/TextareaAutosize';
// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import * as Yup from 'yup';
// import { Formik } from 'formik';
// import config from '../../../config';
// import CodeIcon from '@mui/icons-material/Code';
// import { Field } from 'formik';
// import { useAuthContext } from '../../../context/useAuthContext';
// import { useLogout } from '../../../hooks/useLogout';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

export default function AlbumForm() {
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
  const handleSubmit = async (values) => {
    console.log('Submitting form with values:', values);
  };

  // sample genres
  const genres = ['Rock', 'Pop', 'Jazz', 'Hip Hop', 'Rap', 'Country', 'Blues', 'Classical', 'Electronic', 'Folk', 'Reggae'];

  // sample artists with id, name
  const artists = [
    { _id: '1', name: 'Artist 1' },
    { _id: '2', name: 'Artist 2' },
    { _id: '3', name: 'Artist 3' },
    { _id: '4', name: 'Artist 4' },
    { _id: '5', name: 'Artist 5' }
  ];

  return (
    <>
      <MainCard title="Add New Album">
        <Formik
          initialValues={{
            name: '',
            number_of_tracks: '',
            year: '',
            album_art: '',
            artist: '',
            studio: '',
            genre: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required'),
            number_of_tracks: Yup.number().required('Number of tracks is required'),
            year: Yup.number().required('Year is required'),
            album_art: Yup.string().required('Album art is required'),
            artist: Yup.string().required('Artist is required'),
            studio: Yup.string().required('Studio is required'),
            genre: Yup.string().required('Genre is required')
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
                        values.album_art
                          ? values.album_art
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
                      Number of Tracks
                    </Typography>
                    <TextField
                      fullWidth
                      margin="normal"
                      name="number_of_tracks"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.number_of_tracks}
                      error={Boolean(touched.number_of_tracks && errors.number_of_tracks)}
                      helperText={touched.number_of_tracks && errors.number_of_tracks}
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
                      Year
                    </Typography>
                    <TextField
                      fullWidth
                      margin="normal"
                      name="year"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.year}
                      error={Boolean(touched.year && errors.year)}
                      helperText={touched.year && errors.year}
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
                      Album Art URL
                    </Typography>
                    <TextField
                      fullWidth
                      margin="normal"
                      name="album_art"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.album_art}
                      error={Boolean(touched.album_art && errors.album_art)}
                      helperText={touched.album_art && errors.album_art}
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
                      Artist
                    </Typography>
                    <FormControl fullWidth margin="normal" error={Boolean(touched.artist && errors.artist)}>
                      <Select name="artist" value={values.artist} onChange={handleChange} onBlur={handleBlur} displayEmpty>
                        <MenuItem value="" disabled>
                          Select Artist
                        </MenuItem>
                        {artists.map((artist) => (
                          <MenuItem key={artist._id} value={artist.name}>
                            {artist.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {touched.artist && errors.artist && <Typography color="error">{errors.artist}</Typography>}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h5" component="h5">
                      Studio
                    </Typography>
                    <TextField
                      fullWidth
                      margin="normal"
                      name="studio"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.studio}
                      error={Boolean(touched.studio && errors.studio)}
                      helperText={touched.studio && errors.studio}
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
                      Genre
                    </Typography>
                    <FormControl fullWidth margin="normal" error={Boolean(touched.genre && errors.genre)}>
                      <Select name="genre" value={values.genre} onChange={handleChange} onBlur={handleBlur} displayEmpty>
                        <MenuItem value="" disabled>
                          Select Genre
                        </MenuItem>
                        {genres.map((genre) => (
                          <MenuItem key={genre} value={genre}>
                            {genre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {touched.genre && errors.genre && <Typography color="error">{errors.genre}</Typography>}
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
