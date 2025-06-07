import React from 'react';
import { Box, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography paragraph>
        Welcome to your dashboard! This is where you can add your dashboard content.
      </Typography>
    </Box>
  );
};

export default Dashboard; 