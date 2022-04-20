import React, { useContext, useEffect, useState } from 'react';
// material
import {
   Button, Card, List, ListItem, Grid, Alert, CircularProgress
} from '@mui/material';
import { styled } from '@mui/system';
// next 
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { ACTION_TYPES, Store } from '../utils/Store';
import { CheckoutWizard, Title, OrderSummary, ShippingInfo, PaymentInfo, TableItems } from '../components'
import { placeOrder as Text } from '../utils/text'
import { apiReq } from '../functions/apiFunction';

function PlaceOrder() {
   const { state: { cart, lang }, dispatch } = useContext(Store),
      { shippingAddress, paymentMethod } = cart,
      router = useRouter(),
      [error, setError] = useState(""),
      [loading, setLoading] = useState("")

   useEffect(() => {
      !paymentMethod && router.push('/payment')
      !cart.cartItems.length && router.push("/cart")
   }, [paymentMethod, cart.cartItems])

   const round2 = num => Math.round(num * 100 + Number.EPSILON) / 100,
      itemsNum = cart.cartItems.reduce((acc, c) => acc + c.quantity, 0),
      subtotalNum = round2(cart.cartItems.reduce((acc, c) => acc + c.quantity * c.price, 0)),
      tax = round2(subtotalNum * 0.18), shippingPrice = 10,
      totalPrice = subtotalNum + tax + shippingPrice

   const StyledList = styled(List)({
      '& .title': { textAlign: lang === 'he' ? 'right' : 'left', },
      '& .price': { textAlign: lang === 'he' ? 'left' : 'right', },
   }), StyledContainer = styled("div")({
      h2: { fontWeight: "bold" },
      "& .card": { margin: "1rem 0" }
   })

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
      <StyledContainer>
         <CheckoutWizard activeStep={3} />
         <Title title={Text[lang].h1} />
         <Grid container spacing={3} >

            <Grid item md={9} xs={12}>
               {/* shipping address */}
               <ShippingInfo {...{ lang, Text, shippingAddress }} />

               {/* payment method */}
               <PaymentInfo {...{ Text, paymentMethod, lang }} />

               {/* items table */}
               <TableItems {...{ lang, cartItems: cart.cartItems, Text }} />
            </Grid>

            {/* order summary */}
            <Grid item md={3} xs={12} style={{ textAlign: lang === "en" ? "left" : "right" }}>
               <Card variant='outlined' className='card'>
                  <StyledList>
                     <OrderSummary {...{ Text, lang, itemsNum, tax, totalPrice, shippingPrice }} />
                     {error && <Alert dir='ltr' severity="error">{error}</Alert>}
                     <ListItem>
                        <Button fullWidth onClick={placeOrderHandler} variant='contained' color='secondary'>
                           {Text[lang]["summaryBtn"]}
                        </Button>
                     </ListItem>
                     {loading && <ListItem> <CircularProgress style={{ margin: "0 auto" }} /></ListItem>}
                  </StyledList>
               </Card>
            </Grid>

         </Grid>

      </StyledContainer >

   )
}


export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
