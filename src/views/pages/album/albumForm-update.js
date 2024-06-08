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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function AlbumForm() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const urlParams = new URLSearchParams(window.location.search);
  const albumId = urlParams.get('id');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [albumData, setAlbumData] = useState(null);
  const [artistData, setartistData] = useState(null);
  const [genreData, setGenreData] = useState(null);

  useEffect(() => {
    fetchAlbumData();
  }, [albumId]);

  useEffect(() => {
    fetchArtistDetails();
    fetchGenreDetails();
  }, [albumId]);

  useEffect(() => {
    if (albumData) {
      console.log('Album data:', albumData);
      console.log('Album name:', albumData.name);
    }
  }, [albumData]);

  async function fetchAlbumData() {
    try {
      const response = await fetch(`https://33qffjf2y2.execute-api.eu-north-1.amazonaws.com/dev/album?id=${albumId}`);
      const data = await response.json();
      setAlbumData(data.body[0]);
    } catch (error) {
      console.error('Error fetching album data:', error);
    } 
  }

  const fetchArtistDetails = () => {
    fetch('https://33qffjf2y2.execute-api.eu-north-1.amazonaws.com/dev/artist', {})
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched artist data:', data);
        setartistData(data.body);
      })
      .catch((error) => {
        console.error('Error fetching artist data:', error);
      });
  };

  const fetchGenreDetails = () => {
    fetch('https://33qffjf2y2.execute-api.eu-north-1.amazonaws.com/dev/genre', {})
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched genre data:', data);
        setLoading(false);
        setGenreData(data.body);
      })
      .catch((error) => {
        console.error('Error fetching genre data:', error);
        setLoading(false);
      });
  };

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
          id: albumId,
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
      <MainCard title="Update Album">
        {albumData && (
          <Formik
            initialValues={{
              name: albumData?.name || '',
              number_of_tracks: albumData?.number_of_tracks || '',
              year: albumData?.year || '',
              album_art: albumData?.album_art || '',
              artist: albumData?.artist || '',
              studio: albumData?.studio || '',
              genre: albumData?.genre || ''
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
                        <Select name="artist" value={values.artist.name} onChange={handleChange} onBlur={handleBlur} displayEmpty>
                          <MenuItem value="" disabled>
                            Select Artist
                          </MenuItem>
                          {artistData.map((artist) => (
                            <MenuItem key={artist.id} value={artist.name}>
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
                        <Select name="genre" value={values.genre.name} onChange={handleChange} onBlur={handleBlur} displayEmpty>
                          <MenuItem value="" disabled>
                            Select Genre
                          </MenuItem>
                          {genreData.map((genre) => (
                            <MenuItem key={genre.id} value={genre.name}>
                              {genre.name}
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
                    {/* {submitting && <CircularProgress size={20} color="inherit" /> : } */}
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                      endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                      {'Update Album'}
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
