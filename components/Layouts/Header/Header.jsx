import React, { useContext, useState } from 'react';
import { AppBar, Badge, Button, FormControl, InputLabel, Menu, MenuItem, Select, Switch, Toolbar } from '@mui/material';
import { styled } from '@mui/system';
import { Store, ACTION_TYPES } from '../../../utils/Store';
import LanguageIcon from '@mui/icons-material/Language';
import { MyLink } from '../../'
import { header as Text } from '../../../utils/text'
import Image from 'next/image';


const { DARK_MODE, LANG_EN, LANG_HE, LIGHT_MODE } = ACTION_TYPES;

const StyledNav = styled(AppBar)(({ theme }) => ({
  '& .toolBar': {
    height: "100%",
    [theme.breakpoints.down('sm')]: {
      padding: "0"
    }
  },
  '& .link': {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: '0 0 0 1rem',
    background: "#ffffff4c",
    borderRadius: "50%",
    aspectRatio: "4/4",
    height: "50px",
    // width: "calc(height*1)"
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
  "& .userBtn": {
    textTransform: "initial"
  }
}));

export default function Header() {
  const { state, dispatch } = useContext(Store),
    { darkMode, cart, user, lang } = state,
    [menuState, setMenuState] = useState(false);

  const ChangeDarkHandler = () => dispatch({ type: darkMode ? LIGHT_MODE : DARK_MODE });

  const handleMenu = (e) => setMenuState(menuState ? false : e.currentTarget)

  const handleLogout = () => dispatch({ type: ACTION_TYPES.USER_LOGOUT })

  const handleLangChange = (e) => dispatch({ type: e.target.value == 'he' ? LANG_HE : LANG_EN });

  return (
    <StyledNav dir="ltr" position="static">
      <Toolbar className='toolBar'>
        <MyLink href="/" className="link"  >
          <Image priority objectFit="contain" width={"40px"} height={"40px"} src='/logo2.svg' alt="logo" />
        </MyLink>

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

        {/* error */}
        <MyLink href="/cart" className="linkNav" >
          {cart?.cartItems && cart.cartItems.length ? (
            <Badge color="secondary" badgeContent={cart.cartItems.length}>{Text[lang].cart} </Badge>
          ) : Text[lang].cart}
        </MyLink>
        {!user ?
          <MyLink href="/login" className="linkNav">
            {Text[lang].login}
          </MyLink>
          :
          <>
            <Button className='userBtn' onClick={handleMenu} color='inherit'>{user.name}</Button>
            <Menu
              anchorEl={menuState}
              open={Boolean(menuState)}
              onClose={handleMenu}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              onClick={handleMenu}
            >
              <MenuItem > <MyLink href="/profile">{Text[lang].profile}</MyLink></MenuItem>
              <MenuItem ><MyLink href="/my-orders">{Text[lang].myOrders}</MyLink></MenuItem>
              <MenuItem onClick={handleLogout}>{Text[lang].logout}</MenuItem>
            </Menu>
          </>}
      </Toolbar>
    </StyledNav>
  );
}
