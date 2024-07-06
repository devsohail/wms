// File: resources/js/components/Footer.jsx

import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 8,
        mt: 'auto',
        ml: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Typography variant="body1">
        &copy; {(new Date().getFullYear())} Go4Green. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
