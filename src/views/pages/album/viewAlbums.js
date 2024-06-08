import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MainCard from 'ui-component/cards/MainCard';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'context/useAuthContext';
import ClearIcon from '@mui/icons-material/Clear';
import Swal from 'sweetalert2';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    '&.Mui-selected': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
        ),
        '@media (hover: none)': {
          backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity)
        }
      }
    }
  }
}));

const TracksPopup = ({ open, onClose, trackData, role, handleDeleteSong }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>List of Tracks</DialogTitle>
    <DialogContent>
      {trackData.map((song, index) => (
        <div key={index} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" style={{ flex: 1 }}>
            {song.name}
          </Typography>
          {role === 'admin' && (
            <Button variant="outlined" color="secondary" onClick={() => handleDeleteSong(index)}>
              Delete
            </Button>
          )}
        </div>
      ))}
      <Divider style={{ margin: '20px 0' }} />
      <Typography variant="h6" style={{ marginBottom: '10px' }}>
        Total Tracks: {trackData.length}
      </Typography>
      <Divider style={{ margin: '20px 0' }} />
      {role === 'admin' && (
        <>
          <Typography variant="h6" style={{ marginBottom: '10px' }}>
            Add New Track
          </Typography>
          <TextField fullWidth variant="outlined" label="Track Name" placeholder="Enter track name" style={{ marginBottom: '10px' }} />
          <input type="file" accept="audio/*" style={{ marginBottom: '10px' }} />
          <TextField
            fullWidth
            variant="outlined"
            label="Duration in seconds"
            placeholder="Enter duration"
            style={{ marginBottom: '10px' }}
          />
          <Button variant="contained" color="primary">
            Add Track
          </Button>
        </>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

export default function ViewAlbums() {
  const [albumData, setAlbumData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [trackData, setTrackData] = useState([]);
  const [allTrackData, setAllTrackData] = useState([]);
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const role = user?.role;
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAlbumDetails = () => {
    fetch('https://33qffjf2y2.execute-api.eu-north-1.amazonaws.com/dev/album', {})
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched album data:', data);
        setAlbumData(data.body);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching album data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAlbumDetails();
    fetchAllTrackDetails();
  }, []);

  const rows = Array.isArray(albumData)
    ? albumData.map((album) => ({
        id: album.id,
        name: album.name,
        year: album.year,
        artist: album.artist ? album.artist.name : '', // Accessing nested property safely
        studio: album.studio,
        genre: album.genre ? album.genre.name : '', // Accessing nested property safely
        status: album.status ? 'Published' : 'Not Published'
      }))
    : [];

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, flex: 0.5 },
    { field: 'name', headerName: 'Album', width: 130, flex: 1 },
    { field: 'year', headerName: 'Year', width: 130, flex: 1 },
    { field: 'artist', headerName: 'Artist', width: 130, flex: 1 },
    { field: 'studio', headerName: 'Studio', width: 130, flex: 1 },
    { field: 'genre', headerName: 'Genre', width: 130, flex: 1 },
    { field: 'status', headerName: 'Status', width: 130, flex: 1 },
    ...(role === 'admin'
      ? [
          {
            field: 'edit',
            headerName: '',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            flex: 1,
            width: 100,
            minWidth: 150,
            align: 'right',
            headerAlign: 'right',
            renderCell: (params) => (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    updateAlbum(params.row.id);
                  }}
                  sx={{ borderRadius: '50%', padding: '8px', minWidth: 'unset', width: '32px', height: '32px' }}
                >
                  <ModeIcon sx={{ fontSize: '18px' }} />
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    deleteAlbum(params.row.id);
                  }}
                  style={{ marginLeft: '5px' }}
                  sx={{ borderRadius: '50%', padding: '8px', minWidth: 'unset', width: '32px', height: '32px' }}
                >
                  <DeleteIcon sx={{ fontSize: '18px' }} />
                </Button>
              </>
            )
          }
        ]
      : [])
  ];

  function updateAlbum(albumId) {
    console.log('clicked album id', albumId);
    navigate('/app/album/update?id=' + albumId);
  }

  function deleteAlbum(albumId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this album!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(
      (result) => {
        if (result.isConfirmed) {
          Swal.fire('Deleted!', 'Your album has been deleted.', 'success', albumId);
        }
      } // End of Swal.fire
    );
  }

  useEffect(() => {
    const applyFilters = () => {
      let filtered = rows;

      if (artist) {
        filtered = filtered.filter((album) => album.artist.toLowerCase().includes(artist.toLowerCase()));
      }
      if (genre) {
        filtered = filtered.filter((album) => album.genre.toLowerCase().includes(genre.toLowerCase()));
      }
      if (year) {
        filtered = filtered.filter((album) => album.year.toString() === year);
      }
      if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const trackAlbums = allTrackData
          .filter((track) => track.name.toLowerCase().includes(lowerCaseQuery))
          .map((track) => track.album_id);

        filtered = filtered.filter(
          (album) =>
            album.name.toLowerCase().includes(lowerCaseQuery) ||
            album.artist.toLowerCase().includes(lowerCaseQuery) ||
            album.genre.toLowerCase().includes(lowerCaseQuery) ||
            album.year.toString().includes(lowerCaseQuery) ||
            trackAlbums.includes(album.id)
        );
      }

      setFilteredData(filtered);
    };

    applyFilters();
  }, [artist, genre, year, searchQuery, rows, allTrackData]);

  const handleRowSelection = (albumId) => {
    if (role !== 'admin') {
      navigate('/app/album/details?id=' + albumId);
    } else {
      fetchTrackDetails(albumId);
    }
  };

  const fetchTrackDetails = (albumId) => {
    console.log('Fetching track details for album:', albumId);
    fetch(`https://33qffjf2y2.execute-api.eu-north-1.amazonaws.com/dev/track?album_id=${albumId}`, {})
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched track data:', data);
        setTrackData(data.body); // Assuming the array of tracks is in the 'body' property
        setOpenPopup(true); // Move this line here
      })
      .catch((error) => {
        console.error('Error fetching track data:', error);
        setLoadingTracks(false);
      });
  };

  const fetchAllTrackDetails = () => {
    fetch(`https://33qffjf2y2.execute-api.eu-north-1.amazonaws.com/dev/track`, {})
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched track data:', data);
        setAllTrackData(data.body); // Assuming the array of tracks is in the 'body' property
      })
      .catch((error) => {
        console.error('Error fetching track data:', error);
      });
  };

  const handleDeleteSong = (index) => {
    const updatedSongs = [...trackData];
    updatedSongs.splice(index, 1);
    setTrackData(updatedSongs);
  };

  const clearFilters = () => {
    setArtist('');
    setGenre('');
    setYear('');
    setSearchQuery('');
  };

  const handleButtonClick = () => {
    navigate('/app/album/add');
  };

  return (
    <>
      <MainCard
        title="View Albums"
        buttonLabel={
          <>
            Add New Album
            <AddIcon style={{ marginLeft: '5px' }} />
          </>
        }
        onButtonClick={role === 'admin' ? handleButtonClick : undefined}
      >
        {loading && <LinearProgress style={{ marginBottom: '30px' }} />}
        <Grid container direction="column" justifyContent="left" sx={{ mt: 3 }}>
          <Grid container sx={{ mb: 2 }} spacing={2} alignItems="center">
            <Grid item xs={12} sm={5}>
              <TextField
                label="Search by Album, Artist, Genre, Year, or Track"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Artist</InputLabel>
                <Select value={artist} onChange={(e) => setArtist(e.target.value)} label="Artist">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {albumData.map((album) => (
                    <MenuItem key={album.id} value={album.artist.name}>
                      {album.artist.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Genre</InputLabel>
                <Select value={genre} onChange={(e) => setGenre(e.target.value)} label="Genre">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {albumData.map((album) => (
                    <MenuItem key={album.id} value={album.genre.name}>
                      {album.genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField label="Year" variant="outlined" fullWidth value={year} onChange={(e) => setYear(e.target.value)} />
            </Grid>
            <Grid item xs={3} sm={1} style={{ textAlign: 'end' }}>
              <IconButton onClick={clearFilters}>
                <ClearIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <StripedDataGrid
              rows={filteredData.length > 0 ? filteredData : rows}
              columns={columns}
              getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 25 }
                }
              }}
              getRowId={(row) => row.id}
              getRowStyle={(params) => ({
                backgroundColor: params.index % 2 === 0 ? '#fff' : '#f0f8ff'
              })}
              pageSizeOptions={[10, 25, 100]}
              checkboxSelection
              onRowClick={(params) => {
                handleRowSelection(params.row.id);
              }}
            />
          </Grid>
        </Grid>
      </MainCard>
      <TracksPopup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        trackData={trackData}
        role={role}
        handleDeleteSong={handleDeleteSong}
      />
    </>
  );
}
