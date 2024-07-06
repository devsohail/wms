// File: resources/js/components/Header.jsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Logo from './Logo';

const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Logo />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 2 }}>
          WMS
        </Typography>
        <Button color="inherit" href="/profile">Profile</Button>
        <Button color="inherit" href="/logout">Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
