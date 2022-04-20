import { Grid, ListItem, Typography } from '@mui/material'
import React from 'react'

function OrderSummary({ Text, lang, itemsNum, tax, totalPrice, shippingPrice }) {
   return (
      <>
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
      </>
   )
}

export default OrderSummary