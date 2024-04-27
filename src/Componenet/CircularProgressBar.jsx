import React from 'react';
import { CircularProgress, Typography } from '@mui/material';

function CircularProgressBar({ creditPoints }) {
  const maxCreditPoints = 100; // Assuming maximum credit points
  const progressValue = (creditPoints / maxCreditPoints) * 100;

  // Display value with ellipsis if credit points exceed 4 digits
  const displayValue = creditPoints > 9999 ? creditPoints.toString().slice(0, 4) + '...' : creditPoints;

  return (
    <div style={{ position: 'relative', width: 100, height: 100 }}>
      <CircularProgress
        variant="determinate"
        size={100}
        thickness={4}
        value={progressValue}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      <Typography
        variant="h5"
        component="div"
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        {displayValue}
      </Typography>
    </div>
  );
}

export default CircularProgressBar;
