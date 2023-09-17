import React, { FC, memo } from 'react';
import { Box, CircularProgress } from '@mui/material';

type LoaderProps = {
  isFullScreen?: boolean;
};

const Loader: FC<LoaderProps> = ({ isFullScreen }) => {
  if (isFullScreen) {
    return (
      <Box
        sx={{
          width: '100%',
          height: 'fill-available',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.paper',
          flexDirection: 'column',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default memo(Loader);
