import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));
// ===========================|| ALBUM CARD ||=========================== //

const AlbumCard = ({ isLoading }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      src={'https://img.freepik.com/free-psd/saturday-party-social-media-template_505751-2937.jpg?t=st=1714050313~exp=1714053913~hmac=14ccd418a2f2502ebc4ec14efc01c8aefa62bd858ec7362bf6f69742f527e96a&w=740'} // Album image source
                      alt="Album"
                      sx={{
                        width: theme.spacing(30),
                        height: theme.spacing(30),
                        backgroundColor: theme.palette.secondary[800],
                        mt: 1
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, mt: 2 }}>Album Name</Typography>
              </Grid>
              <Grid item sx={{ mt: 1 }}>
                <Typography variant="body2">Artist: Artist Name</Typography>
              </Grid>
              <Grid item sx={{ mt: 1 }}>
                <Typography variant="body2">Genre: Genre Name</Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

AlbumCard.propTypes = {
  isLoading: PropTypes.bool
};

export default AlbumCard;
