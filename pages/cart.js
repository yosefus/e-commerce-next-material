import React, { useContext } from 'react';
import { Store } from '../utils/Store';
import { Button, Grid, MenuItem, Select, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Card, List, ListItem } from '@mui/material';
import Link from 'next/link';
import { styled } from '@mui/system';
import Image from 'next/image';
import { BiTrash } from "react-icons/bi";

const Text = {
  en: {
    title: 'shopping cart',
    emptyMsg: 'cart is empty.',
    emptyLink: 'go shopping',
    image: 'image',
    name: 'name',
    price: "price",
    quantity: 'quantity',
    actions: 'actions',
    subtotal: "subtotal",
    itemsInCart: "items in cart"
  },
  he: {
    title: 'עגלת הקניות',
    emptyMsg: 'העגלה ריקה.',
    emptyLink: 'חזור לקניות',
    image: 'תמונה',
    name: 'שם',
    price: "מחיר",
    quantity: 'כמות',
    actions: 'פעולות',
    subtotal: "סך הכל",
    itemsInCart: "פריטים בעגלה"
  },
};

function CartScreen() {
  const { state } = useContext(Store);
  const { cart, lang } = state;

  const itemsNum = cart.cartItems.reduce((acc, c) => acc + c.quantity, 0)
  const subtotalNum = cart.cartItems.reduce((acc, c) => acc + c.quantity * c.price, 0)

  const StyledCell = styled(TableCell)({
    '&': {
      // direction: lang === 'he' ? 'rtl' : 'ltr',
      // alignItems: lang === 'he' ? 'right' : 'left',
      // textAlign: lang === 'he' ? 'right' : 'left',
      textAlign: "center",
    },
  });

  return (
    <div>
      <Typography component={'h1'} variant={'h1'}>{Text[lang].title}</Typography>
      {!cart.cartItems.length ? (
        <div>
          {Text[lang].emptyMsg + " "}
          <Link href={'/'}> <a>{Text[lang].emptyLink}</a> </Link>
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

                {cart.cartItems.map((item, i) => <TableRow key={`table${i}`}>
                  <StyledCell>
                    <Link href={`/product/${item.slug}`}>
                      <a><Image src={item.image} width={50} height={50} alt={item.name["en"]} /></a>
                    </Link>
                  </StyledCell>
                  <StyledCell>
                    <Link href={`/product/${item.slug}`}>
                      <a><Typography color="secondary">{item.name[lang]} </Typography> </a>
                    </Link>
                  </StyledCell>
                  <StyledCell>
                    <Select value={item.quantity}>
                      {[...Array(item.countInStock).keys()].map(q =>
                        <MenuItem key={q + 1} value={q + 1}>{q + 1}</MenuItem>
                      )}
                    </Select>
                  </StyledCell>
                  <StyledCell>${item['price']}</StyledCell>
                  <StyledCell>
                    <Button variant='contained' color='secondary'><BiTrash size={20} /></Button>
                  </StyledCell>
                </TableRow>)}
              </Table>
            </TableContainer>
          </Grid>

          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant='h2'>{Text[lang]["subtotal"]} {itemsNum} {Text[lang]["itemsInCart"]}: ${subtotalNum} </Typography>
                </ListItem>
              </List>
            </Card>
          </Grid>

        </Grid>
      )}
    </div>
  );
}

export default CartScreen;
