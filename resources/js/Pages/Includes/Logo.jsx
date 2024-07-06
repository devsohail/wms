// File: resources/js/components/Logo.jsx

import React from 'react';
import { Box } from '@mui/material';

const Logo = ({ height = 40 }) => {
  return (
    <Box
      component="img"
      sx={{ height, cursor: 'pointer' }}
      alt="go4green"
      src="/images/Go4Green-logo.png"
    />
  );
}

export default Logo;
