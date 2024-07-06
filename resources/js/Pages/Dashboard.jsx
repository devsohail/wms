// File: resources/js/components/Dashboard.jsx

import React from 'react';
import { Container, Box, CssBaseline, Typography } from '@mui/material';
import Header from './Includes/Header';
import LeftMenu from './Includes/LeftMenu';
import Footer from './Includes/Footer';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Header />
      <Box sx={{ display: 'flex', flex: 1, pt: 8 }}>
        <LeftMenu />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Container>
            <Typography variant="h4" gutterBottom>
              Welcome to your dashboard
            </Typography>
            {/* Content goes here */}
          </Container>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default Dashboard;
