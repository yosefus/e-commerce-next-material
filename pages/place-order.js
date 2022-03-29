import React, { useContext, useEffect, useState } from 'react';
import { ACTION_TYPES, Store } from '../utils/Store';
import { Button, TableCell, TableContainer, TableHead, TableRow, Typography, Card, List, ListItem, TableBody, Grid, Table, Alert, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
// import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
// import { apiReq } from '../functions/apiFunction';
import { useRouter } from 'next/router';
import { MyLink, CheckoutWizard } from '../components'
import { placeOrder as Text } from '../utils/text'
import { apiReq } from '../functions/apiFunction';

function PlaceOrder() {
   const { state: { cart, lang }, dispatch } = useContext(Store),
      { shippingAddress, paymentMethod } = cart,
      router = useRouter(),
      [error, setError] = useState(""),
      [loading, setLoading] = useState("")

   useEffect(() => !paymentMethod && router.push('/payment'), [paymentMethod])

   const round2 = num => Math.round(num * 100 + Number.EPSILON) / 100,
      itemsNum = cart.cartItems.reduce((acc, c) => acc + c.quantity, 0),
      subtotalNum = round2(cart.cartItems.reduce((acc, c) => acc + c.quantity * c.price, 0)),
      tax = round2(subtotalNum * 0.18), shippingPrice = 10,
      totalPrice = subtotalNum + tax + shippingPrice

   const StyledCell = styled(TableCell)({
      '&': {
         padding: 0,
         textAlign: "center",
      },
   }),
      StyledList = styled(List)({
         '& .title': {
            textAlign: lang === 'he' ? 'right' : 'left',
         },
         '& .price': {
            textAlign: lang === 'he' ? 'left' : 'right',
         },
      });

   const placeOrderHandler = async () => {
      setError("")
      setLoading(true)
      const res = await apiReq({ method: "post", path: "/orders", body: { shippingAddress: cart.shippingAddress, subtotalNum, tax, shippingPrice, totalPrice, cartItems: cart.cartItems, paymentMethod } })

      if (!res._id) {
         setError(res.message || res);
      } else {
         dispatch({ type: ACTION_TYPES.CLEAR_CART })
         router.push(`/order/${res._id}`)
      }

      setLoading()
   }

   return (
      <div>
         <CheckoutWizard activeStep={3} />

         <Typography
            style={{ margin: "2rem 0", textAlign: "center" }}
            component={'h1'}
            variant={'h1'}>
            {Text[lang].h1}
         </Typography>

         <Grid container spacing={3} >
            <Grid item md={9} xs={12}>

               <Card>
                  <List>
                     <ListItem>
                        <Typography variant='h2' component="h2">
                           {Text[lang].shippingAddress}
                        </Typography>
                     </ListItem>
                     <ListItem>
                        {shippingAddress.fullName}{" "}, {shippingAddress.address}{" "}, {shippingAddress.city}{" "}, {shippingAddress.country}{" "}, {shippingAddress.postalCode}
                     </ListItem>
                  </List>
               </Card>

               <Card>
                  <List>
                     <ListItem>
                        <Typography variant='h2' component="h2">
                           {Text[lang].paymentMethod}
                        </Typography>
                     </ListItem>
                     <ListItem>
                        {paymentMethod}
                     </ListItem>
                  </List>
               </Card>

               <Card>
                  <List>
                     <ListItem>
                        <Typography variant='h2' component="h2">{Text[lang].itemsOrder}</Typography>
                     </ListItem>
                     <ListItem>
                        <TableContainer>
                           <Table>
                              <TableHead>
                                 <TableRow>
                                    <StyledCell>{Text[lang]['img']}</StyledCell>
                                    <StyledCell>{Text[lang]['name']}</StyledCell>
                                    <StyledCell>{Text[lang]['quantity']}</StyledCell>
                                    <StyledCell>{Text[lang]['price']}</StyledCell>
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
                                       <Typography>{item.quantity}</Typography>
                                    </StyledCell>
                                    <StyledCell>${item['price']}</StyledCell>
                                 </TableRow>)}
                              </TableBody>
                           </Table>
                        </TableContainer>
                     </ListItem>
                  </List>
               </Card>
            </Grid>

            <Grid item md={3} xs={12} style={{ textAlign: lang === "en" ? "left" : "right" }}>
               <Card>
                  <StyledList>
                     <ListItem>
                        <Typography style={{ margin: "1rem auto" }} variant='h2'>{Text[lang]["summary"]} </Typography>
                     </ListItem>

                     <ListItem>
                        <Grid container>
                           <Grid item xs={6}>
                              <Typography className='title'>{Text[lang]["items"]}</Typography>
                           </Grid>
                           <Grid item xs={6}>
                              <Typography className='price'>{itemsNum}</Typography>
                           </Grid>
                        </Grid>
                     </ListItem>

                     <ListItem>
                        <Grid container>
                           <Grid item xs={6}>
                              <Typography className='title'>{Text[lang]["tax"]}</Typography>
                           </Grid>
                           <Grid item xs={6}>
                              <Typography className='price'>${tax}</Typography>
                           </Grid>
                        </Grid>
                     </ListItem>

                     <ListItem>
                        <Grid container>
                           <Grid item xs={6}>
                              <Typography className='title'>{Text[lang]["shipping"]}</Typography>
                           </Grid>
                           <Grid item xs={6}>
                              <Typography className='price'>${shippingPrice}</Typography>
                           </Grid>
                        </Grid>
                     </ListItem>

                     <ListItem>
                        <Grid container>
                           <Grid item xs={6}>
                              <Typography className='title'> <strong>{Text[lang]["total"]}</strong></Typography>
                           </Grid>
                           <Grid item xs={6}>
                              <Typography className='price'><strong>${totalPrice} </strong></Typography>
                           </Grid>
                        </Grid>
                     </ListItem>

                     {error && <Alert dir='ltr' severity="error">{error}</Alert>}
                     <ListItem>
                        <Button
                           fullWidth
                           onClick={placeOrderHandler}
                           variant='contained'
                           color='secondary'>
                           {Text[lang]["summaryBtn"]}
                        </Button>
                     </ListItem>
                     {loading && <ListItem> <CircularProgress style={{ margin: "0 auto" }} /></ListItem>}
                  </StyledList>
               </Card>
            </Grid>

         </Grid>

      </div >

   )
}


export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
