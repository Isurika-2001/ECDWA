import * as React from 'react';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { useMediaQuery, Typography, TextField, InputAdornment, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
// import config from '../../../config';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
// import { useAuthContext } from '../../../context/useAuthContext';
// import { useLogout } from '../../../hooks/useLogout';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
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
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity)
        }
      }
    }
  }
}));

export default function ViewGenres() {
  const [genreData, setGenreData] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  // const { logout } = useLogout();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // const { user } = useAuthContext();
  // const { permissions } = user || {};

  // Function to handle search
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    // setSearchTerm(term);

    // Filter the genreData based on the search term
    const filteredArtists = genreData.filter((artist) => artist.name.toLowerCase().includes(term));
    setFilteredData(filteredArtists);
  };

  //fetch artist details
  const fetchGenreDetails = () => {
    fetch('https://33qffjf2y2.execute-api.eu-north-1.amazonaws.com/dev/genre', {})
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched artist data:', data);
        setLoading(false);
        setGenreData(data.body);
      })
      .catch((error) => {
        console.error('Error fetching album data:', error);
        setLoading(false);
      });
  };

  // Transform artist data into rows
  const rows = Array.isArray(genreData)
    ? genreData.map((genre) => ({
        id: genre.id,
        name: genre.name
      }))
    : [];

  console.log('rows', rows);

  useEffect(() => {
    fetchGenreDetails();
  }, []);

  console.log(genreData);

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1, width: 100, minWidth: 150, hide: true },
    { field: 'name', headerName: 'Genre Name', flex: 2, width: 100, minWidth: 150, align: 'center', headerAlign: 'center' },
    {
      field: 'edit',
      headerName: '',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 2,
      minWidth: 150,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              updateArtist(params.row.id);
            }}
            sx={{ borderRadius: '50%', padding: '8px', minWidth: 'unset', width: '32px', height: '32px' }}
          >
            <ModeIcon sx={{ fontSize: '18px' }} />
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              deleteArtist(params.row.id);
            }}
            style={{ marginLeft: '5px' }}
            sx={{ borderRadius: '50%', padding: '8px', minWidth: 'unset', width: '32px', height: '32px' }}
          >
            <DeleteIcon sx={{ fontSize: '18px' }} />
          </Button>
        </>
      )
    }
  ];

  function updateArtist(genreID) {
    console.log('clicked user id', genreID);
    navigate('/app/genre/update?id=' + genreID);
  }

  function deleteArtist(genreID) {
    // swal message
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this genre!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        (result) => {
          if (result.isConfirmed) {
            Swal.fire('Deleted!', 'The genre has been deleted.', 'success', genreID);
          }
        }
      }
    });
  }

  function handleButtonClick() {
    navigate('/app/genre/add');
  }

  return (
    <>
      <MainCard
        title="View Genres"
        buttonLabel={
          <>
            Add New Genre
            <AddIcon style={{ marginLeft: '5px' }} /> {/* Adjust styling as needed */}
          </>
        }
        onButtonClick={handleButtonClick}
      >
        {loading && <LinearProgress style={{ marginBottom: '30px' }} />}
        <Grid style={{ marginTop: '-30px' }} container direction="column" justifyContent="left">
          <Grid container sx={{ p: 3, marginTop: '4px' }} spacing={matchDownSM ? 0 : 2}>
            <Grid item xs={12} sm={3.5}>
              <Typography variant="h6" component="h6" style={{ marginBottom: '-10px' }}>
                Search
              </Typography>
              <TextField
                fullWidth
                // label="First Name"
                margin="normal"
                name="artist"
                type="text"
                size="small"
                SelectProps={{ native: true }}
                defaultValue=""
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                onChange={handleSearch} // Call handleSearch on input change
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {/* <div style={{ height: 710, width: '100%' }}> */}
              <StripedDataGrid
                rows={filteredData.length > 0 ? filteredData : rows}
                // rowHeight={40}
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
              />
              {/* </div> */}
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
}
