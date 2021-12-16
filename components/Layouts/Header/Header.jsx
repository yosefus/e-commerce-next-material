import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';

const StyledNav = styled(AppBar)({
  '& .link': {
    margin: '0 0 0 1rem',
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },

  '& .linkNav': {
    margin: '0 1rem 0 0 ',
    textTransform: 'capitalize',
  },
});

export default function Header() {
  return (
    <StyledNav position="static">
      <Toolbar>
        <Link href="/">
          <a className="link">
            <Typography variant="danger" color="danger">
              Yosefus
            </Typography>
          </a>
        </Link>
        <div style={{ flexGrow: 1 }}></div>
        <Link href="/">
          <a className="linkNav">cart</a>
        </Link>
        <Link href="/">
          <a className="linkNav">login</a>
        </Link>
      </Toolbar>
    </StyledNav>
  );
}
