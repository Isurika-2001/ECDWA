import React, { useState } from 'react';
import { Typography, Button, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import MainCard from 'ui-component/cards/MainCard';
import Swal from 'sweetalert2';

const InventoryReport = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleEmailRequest = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setPassword('');
    setEmail('');
  };

  const handlePasswordSubmit = () => {
    setOpenDialog(false);
    const admin = JSON.parse(localStorage.getItem('user'));
    if (admin && admin.email === email && admin.password === password && admin.role === 'admin') {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Check your email, we have sent the reports'
      });
      handleDialogClose();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Invalid email or password or you are not an admin'
      });
    }
  };

  // Sample data for reports sorted by date
  const reports = [
    {
      name: 'Report of Popular Albums',
      description:
        'This report provides detailed insights into the most popular albums based on sales and user interactions. It includes information on top-selling albums, highest-rated albums, and trends in album popularity.',
      dateCreated: '2024-06-01'
    },
    {
      name: 'Report of Popular Tracks',
      description:
        'The popular tracks report offers comprehensive analysis and statistics on the most listened-to tracks across the platform. It covers metrics such as total plays, likes, and shares for each track, helping to identify trending and influential music.',
      dateCreated: '2024-05-28'
    },
    {
      name: 'Report of All Albums',
      description:
        'This report presents an overview of all albums available in the inventory. It includes details such as album titles, artists, genres, release dates, and current stock levels. Use this report for inventory management and catalog maintenance purposes.',
      dateCreated: '2024-05-30'
    },
    {
      name: 'Report of All Tracks',
      description:
        'The all tracks report offers a comprehensive listing of every track in the inventory. It provides information on track titles, artists, genres, durations, and availability status. Use this report for detailed track analysis and catalog management.',
      dateCreated: '2024-05-25'
    }
  ];

  // Sort reports by date created
  const sortedReports = reports.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

  return (
    <MainCard title="Request Inventory Reports">
      <Grid container spacing={2}>
        {sortedReports.map((report, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {report.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {report.description}
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ marginTop: 1 }}>
                  Date Created: {report.dateCreated}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" startIcon={<EmailIcon />} onClick={handleEmailRequest} fullWidth sx={{ mt: 2 }}>
            Request Email of Reports
          </Button>
        </Grid>
      </Grid>
      {/* Dialog for password input */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Enter Admin Credentials</DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            Only admins can view the reports. Please enter your admin email and password.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Admin Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handlePasswordSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default InventoryReport;
