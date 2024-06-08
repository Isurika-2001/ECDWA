import PropTypes from 'prop-types';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({ isLoading, album_name, artist_name, album_art, id, genre, year }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handlePlayButtonClick = () => {
    navigate('/app/album/details?id=' + id);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <Card
          sx={{
            display: 'flex',
            width: '100%',
            cursor: 'pointer' // Add this line for hand cursor on hover
          }}
          id={id}
          onClick={handlePlayButtonClick}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {album_name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {artist_name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {genre}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {year}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <IconButton aria-label="previous">{theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}</IconButton>
              <IconButton aria-label="play/pause">
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              </IconButton>
              <IconButton aria-label="next">{theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}</IconButton>
            </Box>
          </Box>
          <CardMedia
            component="img"
            sx={{ maxWidth: '50%' }} // Adjust the width as needed
            image={album_art}
            alt="Live from space album cover"
          />
        </Card>
      )}
    </>
  );
};

TotalOrderLineChartCard.propTypes = {
  isLoading: PropTypes.bool,
  album_name: PropTypes.string,
  artist_name: PropTypes.string,
  album_art: PropTypes.string,
  id: PropTypes.string.isRequired,
  genre: PropTypes.string,
  year: PropTypes.string
};

export default TotalOrderLineChartCard;
