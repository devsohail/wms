import React from 'react';
import { AppBar, Toolbar, Typography, Box, CssBaseline } from '@mui/material';
import LeftMenu from '@/Pages/Includes/LeftMenu';
import { usePage } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AuthenticatedLayout = ({ children }) => {
  const { auth } = usePage().props;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            WMS Dashboard
          </Typography>
          <Typography variant="subtitle1">
            Welcome, {auth.user.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <LeftMenu />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: `60px` },
          mt: ['48px', '56px', '64px'],
        }}
      >
        {children}
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default AuthenticatedLayout;
