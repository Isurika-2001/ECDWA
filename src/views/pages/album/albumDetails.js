import * as React from 'react';
import { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Typography, Divider, Grid, CardContent, CardMedia, LinearProgress, styled, Box, IconButton, Button } from '@mui/material';
import { PlayArrow as PlayArrowIcon, SkipNext as SkipNextIcon, SkipPrevious as SkipPreviousIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Define custom styles using the styled function
const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  objectFit: 'cover',
  width: '100%',
  height: 'auto'
}));

const ArtistName = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold'
}));

export default function AlbumDetails() {
  const [loading, setLoading] = useState(true);
  const [albumData, setAlbumData] = useState(null);
  const [trackData, setTrackData] = useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  const albumId = urlParams.get('id');
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlbumData();
    fetchTrackDetails();
  }, [albumId]);

  async function fetchAlbumData() {
    try {
      const response = await fetch(`https://33qffjf2y2.execute-api.eu-north-1.amazonaws.com/dev/album?id=${albumId}`);
      const data = await response.json();
      setAlbumData(data.body[0]);
      console.log('Fetched album details:', data.body[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching album data:', error);
      setLoading(false);
    }
  }

  async function fetchTrackDetails() {
    try {
      const response = await fetch(`https://33qffjf2y2.execute-api.eu-north-1.amazonaws.com/dev/track?album_id=${albumId}`);
      const data = await response.json();
      console.log('Fetched track data:', data);
      setTrackData(data.body);
    } catch (error) {
      console.error('Error fetching track data:', error);
    }
  }

  if (loading) {
    return <LinearProgress />;
  }

  const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3), // Added margin top here
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1, 4),
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  }));

  const handleSubbscription = () => {
    navigate('/app/subscription');
  }

  return (
    <MainCard title="Album Details">
      {albumData && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <CardMediaStyled
                component="img"
                height="200"
                image={albumData.album_art || 'https://via.placeholder.com/200'}
                alt={albumData.name}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {albumData.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  <strong>Artist:</strong> <ArtistName>{albumData.artist.name}</ArtistName>
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  <strong>Year:</strong> {albumData.year}
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  <strong>Number of Tracks:</strong> {albumData.number_of_tracks}
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  <strong>Studio:</strong> {albumData.studio}
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  <strong>Genre:</strong> {albumData.genre.name}
                </Typography>

                <StyledButton variant="contained" onClick={handleSubbscription} >Subscribe Now</StyledButton>
              </CardContent>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                  <IconButton aria-label="previous">{theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}</IconButton>
                  <IconButton aria-label="play/pause">
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <IconButton aria-label="next">{theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}</IconButton>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <CardContent>
                <Typography variant="h5" component="h1" gutterBottom>
                  Tracks
                </Typography>
                {trackData && trackData.length > 0 ? (
                  <Grid container spacing={2}>
                    {trackData.map((track, index) => (
                      <Grid item xs={12} key={track.id}>
                        <Typography variant="body1" color="textPrimary">
                          {index + 1}. {track.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Duration: {track.duration}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No tracks available for this album.
                  </Typography>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </>
      )}
    </MainCard>
  );
}
