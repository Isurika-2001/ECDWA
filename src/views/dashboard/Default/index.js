import React, { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  LinearProgress,
  IconButton,
  Typography,
  Card,
  CardContent,
  // CardActionArea
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useAuthContext } from 'context/useAuthContext';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [albumData, setAlbumData] = useState([]);
  const [trackData, setTrackData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuthContext();
  const role = user?.role;

  const fetchAlbumDetails = async () => {
    try {
      const response = await fetch('https://33qffjf2y2.execute-api.eu-north-1.amazonaws.com/dev/album');
      const data = await response.json();
      const albumsWithPopularity = data.body.map((album) => ({
        ...album,
        popularity: Math.floor(Math.random() * 10) + 1 // Generate random popularity data between 1 and 10
      }));
      setAlbumData(albumsWithPopularity);
    } catch (error) {
      console.error('Error fetching album data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrackDetails = async () => {
    try {
      const response = await fetch('https://33qffjf2y2.execute-api.eu-north-1.amazonaws.com/dev/track');
      const data = await response.json();
      const tracksWithPopularity = data.body.map((track) => ({
        ...track,
        popularity: Math.floor(Math.random() * 10) + 1 // Generate random popularity data between 1 and 10
      }));
      setTrackData(tracksWithPopularity);
    } catch (error) {
      console.error('Error fetching track data:', error);
    }
  };

  const fetchGenreDetails = async () => {
    try {
      const response = await fetch('https://33qffjf2y2.execute-api.eu-north-1.amazonaws.com/dev/genre');
      const data = await response.json();
      const genresWithPopularity = data.body.map((genre) => ({
        ...genre,
        popularity: Math.floor(Math.random() * 10) + 1 // Generate random popularity data between 1 and 10
      }));
      setGenreData(genresWithPopularity);
    } catch (error) {
      console.error('Error fetching genre data:', error);
    }
  };

  useEffect(() => {
    fetchAlbumDetails();
    fetchTrackDetails();
    fetchGenreDetails();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = albumData;

      if (artist) {
        filtered = filtered.filter((album) => album.artist.name.toLowerCase().includes(artist.toLowerCase()));
      }
      if (genre) {
        filtered = filtered.filter((album) => album.genre.name.toLowerCase().includes(genre.toLowerCase()));
      }
      if (year) {
        filtered = filtered.filter((album) => album.year.toString() === year);
      }
      if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const trackAlbums = trackData.filter((track) => track.name.toLowerCase().includes(lowerCaseQuery)).map((track) => track.album_id);

        filtered = filtered.filter(
          (album) =>
            album.name.toLowerCase().includes(lowerCaseQuery) ||
            album.artist.name.toLowerCase().includes(lowerCaseQuery) ||
            album.genre.name.toLowerCase().includes(lowerCaseQuery) ||
            album.year.toString().includes(lowerCaseQuery) ||
            trackAlbums.includes(album.id)
        );
      }

      setFilteredData(filtered);
    };

    applyFilters();
  }, [artist, genre, year, searchQuery, albumData, trackData]);

  const rows = Array.isArray(filteredData)
    ? filteredData.map((album) => ({
        _id: album.id,
        name: album.name,
        year: album.year,
        artist: album.artist.name,
        studio: album.studio,
        genre: album.genre.name,
        album_art: album.album_art,
        status: album.status ? 'Published' : 'Not Published',
        popularity: album.popularity || 0 // Default to 0 if no popularity data available
      }))
    : [];

  const clearFilters = () => {
    setArtist('');
    setGenre('');
    setYear('');
    setSearchQuery('');
  };

  // const renderCard = (title, data, keyField, secondaryField) => (
  //   <Grid item xs={12} sm={4} key={title}>
  //     <Card className="custom-card">
  //       <CardContent>
  //         <Typography variant="h6" gutterBottom>
  //           {title}
  //         </Typography>
  //         <div className="card-content">
  //           {data.slice(0, 3).map((item) => (
  //             <CardActionArea key={item[keyField]}>
  //               <div className="card-item">
  //                 <div className="card-image" style={{ backgroundImage: `url(${item.album_art || 'https://via.placeholder.com/200'})` }}>
  //                   <div className="overlay"></div>
  //                 </div>
  //                 <div className="card-details">
  //                   <Typography variant="body1" gutterBottom>
  //                     {item.name}
  //                   </Typography>
  //                   <Typography variant="body2" color="textSecondary">
  //                     {item[secondaryField]}
  //                   </Typography>
  //                   <Typography variant="body2" color="textSecondary">
  //                     Popularity: {item.popularity}
  //                   </Typography>
  //                 </div>
  //               </div>
  //             </CardActionArea>
  //           ))}
  //         </div>
  //       </CardContent>
  //     </Card>
  //   </Grid>
  // );

  if (isLoading) return <LinearProgress />;

  return (
    <>
      {role === 'user' && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Search by Album, Artist, Genre, Year, or Track"
                  variant="outlined"
                  fullWidth
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Grid>
              <Grid item xs={8} sm={2}>
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
              <Grid item xs={8} sm={2}>
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
              <Grid item xs={8} sm={2}>
                <TextField label="Year" variant="outlined" fullWidth value={year} onChange={(e) => setYear(e.target.value)} />
              </Grid>
              <Grid item xs={3} sm={1} style={{ textAlign: 'end' }}>
                <IconButton onClick={clearFilters}>
                  <ClearIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {rows.map((row) => (
                <Grid item lg={4} md={6} sm={6} xs={12} key={row._id}>
                  <TotalOrderLineChartCard
                    isLoading={isLoading}
                    album_name={row.name}
                    artist_name={row.artist}
                    album_art={row.album_art}
                    id={row._id}
                    genre={row.genre}
                    year={row.year}
                    popularity={row.popularity}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
      {role === 'admin' && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card className="analytics-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Popular Albums
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={albumData.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="popularity" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className="analytics-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Popular Genres
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={genreData.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="popularity" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className="analytics-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Popular Tracks
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={trackData.slice(0, 5)}
                      dataKey="popularity"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {trackData.slice(0, 5).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Dashboard;
