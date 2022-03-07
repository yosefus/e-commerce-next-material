import React, { useContext } from 'react';
import { AppBar, Badge, FormControl, InputLabel, MenuItem, Select, Switch, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';
import { Store, ACTION_TYPES } from '../../../utils/Store';
import LanguageIcon from '@mui/icons-material/Language';
import Cookies from 'js-cookie';

const { DARK_MODE, LANG_EN, LANG_HE, LIGHT_MODE } = ACTION_TYPES;

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
  '& .select': {
    margin: '0 1rem',
    borderBottom: '1px solid #fff',
  },
  '& .select > *': {
    color: '#fff',
  },
});

export default function Header() {
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart } = state;

  const ChangeDarkHandler = () => {
    Cookies.set('darkMode', !darkMode ? 'ON' : 'OFF');
    dispatch({ type: darkMode ? LIGHT_MODE : DARK_MODE });
  };

  const handleLangChange = (e) => dispatch({ type: e.target.value == 'he' ? LANG_HE : LANG_EN });

  return (
    <StyledNav dir="ltr" position="static">
      <Toolbar>
        <Link href="/">
          <a className="link">
            <Typography variant="danger" color="danger">
              Yosefus
            </Typography>
          </a>
        </Link>
        <div style={{ flexGrow: 1 }}></div>
        <Switch color="secondary" checked={darkMode === 1} onChange={ChangeDarkHandler}></Switch>

        <FormControl className="select">
          <InputLabel id="lang">
            <LanguageIcon />
          </InputLabel>
          <Select value={state.lang} onChange={(e) => handleLangChange(e)} labelId="lang">
            <MenuItem value={'he'}>עב</MenuItem>
            <MenuItem value={'en'}>En</MenuItem>
          </Select>
        </FormControl>

        <Link href="/">
          <a className="linkNav">
            {cart.cartItems.length ? (
              <Badge color="secondary" badgeContent={cart.cartItems.length}>
                cart
              </Badge>
            ) : (
              'cart'
            )}
          </a>
        </Link>
        <Link href="/">
          <a className="linkNav">login</a>
        </Link>
      </Toolbar>
    </StyledNav>
  );
}
