import React, { useContext } from 'react';
// material
import {
  Button, Grid, MenuItem, Select, Table, TableCell,
  TableContainer, TableHead, TableRow, Typography, Card,
  List, ListItem, TableBody, Link as Mlink
} from '@mui/material';
import { styled } from '@mui/system';
import { BiTrash } from "react-icons/bi";
// next
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';

import { ACTION_TYPES, Store } from '../utils/Store';
import { apiReq } from '../functions/apiFunction';
import { MyLink, Title } from '../components'
import { cart as Text } from '../utils/text'

function CartScreen() {
  const { state: { cart, lang }, dispatch } = useContext(Store);
  const router = useRouter()

  const itemsNum = cart.cartItems.reduce((acc, c) => acc + c.quantity, 0)
  const subtotalNum = cart.cartItems.reduce((acc, c) => acc + c.quantity * c.price, 0)

  const updateCartQuantity = async (_item, quantity) => {
    const item = await apiReq({ path: `/products/${_item._id}`, method: 'get' });
    if (item.countInStock < quantity) return alert(`sorry. we don't have more from this product in stock`);
    dispatch({ type: ACTION_TYPES.ADD_TO_CART, payload: { ...item, quantity } });
  }

  const deleteItem = (item) => dispatch({ type: ACTION_TYPES.REMOVE_ITEM, payload: item });

  const checkout = () => router.push("/shipping")

  const StyledCell = styled(TableCell)({
    '&': { padding: 0, textAlign: "center" },
  }), StyledGrid = styled(Grid)({
    ".head": {
      th: { padding: "1rem 0" },
    },
  })

  return (
    <div>
      <Title title={Text[lang].title} />
      {!cart.cartItems.length ? (
        <div>
          {Text[lang].emptyMsg + " "}
          <Link href={'/'} passHref><Mlink variant='inherit' color="secondary">{Text[lang].emptyLink} </Mlink></Link>
        </div>
      ) : (
        <StyledGrid container spacing={3}>
          <Grid item md={9} xs={12}>

            <Card variant="outlined">
              <TableContainer>
                <Table>

                  <TableHead>
                    <TableRow className='head'>
                      <StyledCell>{Text[lang]['image']}</StyledCell>
                      <StyledCell>{Text[lang]['name']}</StyledCell>
                      <StyledCell>{Text[lang]['quantity']}</StyledCell>
                      <StyledCell>{Text[lang]['price']}</StyledCell>
                      <StyledCell>{Text[lang]['actions']}</StyledCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {cart.cartItems.map((item, i) => <TableRow key={`table${i}`}>
                      <StyledCell>
                        <MyLink href={`/product/${item.slug}`}>
                          <Image src={item.image} width={60} height={60} alt={item.name["en"]} />
                        </MyLink>
                      </StyledCell>
                      <StyledCell>
                        <MyLink href={`/product/${item.slug}`}>
                          <Typography color="secondary">{item.name[lang]} </Typography>
                        </MyLink>
                      </StyledCell>
                      <StyledCell>
                        <Select onChange={e => updateCartQuantity(item, e.target.value)} value={item.quantity}>
                          {[...Array(item.countInStock).keys()].map(q =>
                            <MenuItem key={q + 1} value={q + 1}>{q + 1}</MenuItem>
                          )}
                        </Select>
                      </StyledCell>
                      <StyledCell>${item['price']}</StyledCell>
                      <StyledCell>
                        <Button variant='contained' color='secondary' onClick={() => deleteItem(item)}><BiTrash size={20} /></Button>
                      </StyledCell>
                    </TableRow>)}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>

          <Grid item md={3} xs={12}>
            <Card variant="outlined">
              <List>
                <ListItem>
                  <Typography variant='h2'>{Text[lang]["subtotal"]} {itemsNum} {Text[lang]["itemsInCart"]}: ${subtotalNum} </Typography>
                </ListItem>
                <ListItem><Button onClick={checkout} fullWidth variant='contained' color='secondary'>{Text[lang]["checkout"]}</Button></ListItem>
              </List>
            </Card>
          </Grid>

        </StyledGrid>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
