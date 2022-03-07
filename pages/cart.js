import React, { useContext } from 'react';
import { Store } from '../utils/Store';
import { Grid, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Link from 'next/link';
import { styled } from '@mui/system';

function CartScreen() {
  const { state } = useContext(Store);
  const { cart, lang } = state;

  const Text = {
    en: {
      title: 'shopping cart',
      emptyMsg: 'cart is empty.',
      emptyLink: 'go shopping',
      image: 'image',
      name: 'name',
      quantity: 'quantity',
      actions: 'actions',
    },
    he: {
      title: 'עגלת הקניות',
      emptyMsg: 'העגלה ריקה.',
      emptyLink: 'חזור לקניות',
      image: 'תמונה',
      name: 'שם',
      quantity: 'כמות',
      actions: 'פעולות',
    },
  };

  const StyledCell = styled(TableCell)({
    '&': {
      direction: lang === 'he' ? 'rtl' : 'ltr',
      alignItems: lang === 'he' ? 'right' : 'left',
      juctifyContent: 'center',
      background: '#245534',
    },
  });

  return (
    <div>
      <Typography component={'h1'} variant={'h1'}>
        {Text[lang].title}
      </Typography>
      {!cart.cartItems.length ? (
        <div>
          {Text[lang].emptyMsg}
          <Link href={'/'}>
            <a>{Text[lang].emptyLink}</a>
          </Link>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledCell>{Text[lang]['image']}</StyledCell>
                    <StyledCell>{Text[lang]['name']}</StyledCell>
                    <StyledCell>{Text[lang]['quantity']}</StyledCell>
                    <StyledCell>{Text[lang]['price']}</StyledCell>
                    <StyledCell>{Text[lang]['actions']}</StyledCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            action
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default CartScreen;
