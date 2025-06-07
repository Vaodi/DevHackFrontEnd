import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import SideMenu from './components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No authentication token found');
        return;
      }

      // Set the Authorization header for this request
      const response = await axios.get('http://localhost:2000/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Response data:', response.data);
      setUserData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching user data:', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        // Token is invalid or expired
        localStorage.removeItem('authToken');
        window.location.href = '/signin';
      } else {
        setError(err.response?.data?.error || 'Error fetching user data');
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <MainGrid userData={userData} />
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
