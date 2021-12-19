import { AppBar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const StyledFooter = styled(AppBar)({
  textAlign: 'center',
  height: '5vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export default function Footer() {
  return (
    <StyledFooter position="relative">
      <>all right reserved</>
    </StyledFooter>
  );
}
