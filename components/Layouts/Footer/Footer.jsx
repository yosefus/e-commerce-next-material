import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const StyledFooter = styled(Typography)({
  textAlign: 'center',
});

export default function Footer() {
  return (
    <StyledFooter>
      <>all right reserved</>
    </StyledFooter>
  );
}
