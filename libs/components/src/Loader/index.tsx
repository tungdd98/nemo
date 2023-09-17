import React, { FC, memo } from 'react';
import { Box, CircularProgress } from '@mui/material';

type LoaderProps = {
  isFullScreen?: boolean;
  hasBackdrop?: boolean;
};

const Loader: FC<LoaderProps> = ({ isFullScreen, hasBackdrop }) => {
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
          bgcolor: hasBackdrop ? 'text.primary' : 'background.paper',
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
        bgcolor: hasBackdrop ? 'rgba(255, 255, 255, 0.8)' : 'background.paper',
        zIndex: 1000,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default memo(Loader);
