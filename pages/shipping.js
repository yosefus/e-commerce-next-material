import React, { useContext, useEffect, useState } from 'react'
import { Store, ACTION_TYPES } from '../utils/Store';
import { useRouter } from 'next/router'
import { Button, List, ListItem, TextField, Typography } from '@mui/material';
import { shipping as Text } from '../utils/text'
import { CheckoutWizard } from '../components';

function Shipping() {
   const { state: { user, lang, cart: { shippingAddress } }, dispatch } = useContext(Store),
      router = useRouter(),
      [shipping, setShipping] = useState({})

   useEffect(() => !user && router.push("/login?redirect=/shipping"), [user]);
   useEffect(() => shippingAddress ? setShipping({ ...shippingAddress, get: true }) : setShipping({ get: true }), [shippingAddress]);

   console.log(shippingAddress, shipping);


   const handleSubmit = async (e) => {
      e.preventDefault()
      let values = {}
      Object.values(e.target).forEach(e => e.name ? values[e.name] = e.value : null)
      dispatch({ type: ACTION_TYPES.SAVE_ADDRESS_SHIPPING, payload: values })
      router.push("/payment")
   }


   return (
      <div>
         <CheckoutWizard activeStep={1} />
         <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
            <Typography style={{ textAlign: "center" }} component='h1' variant='h1'>{Text[lang].h1}</Typography>
            <List dir='ltr' >
               {shipping.get ? <>
                  <ListItem>
                     <TextField defaultValue={shipping && shipping.fullName} variant='outlined' fullWidth name='fullName' required inputProps={{ type: "text" }} label={Text[lang].fullname}></TextField>
                  </ListItem>
                  <ListItem>
                     <TextField defaultValue={shipping && shipping.address} variant='outlined' fullWidth name='address' required inputProps={{ type: "text" }} label={Text[lang].address}></TextField>
                  </ListItem>
                  <ListItem>
                     <TextField defaultValue={shipping && shipping.postalCode} variant='outlined' fullWidth name='postalCode' required inputProps={{ type: "text" }} label={Text[lang].postalCode}></TextField>
                  </ListItem>
                  <ListItem>
                     <TextField defaultValue={shipping && shipping.city} variant='outlined' fullWidth name='city' required inputProps={{ type: "text" }} label={Text[lang].city}></TextField>
                  </ListItem>
                  <ListItem>
                     <TextField defaultValue={shipping && shipping.country} variant='outlined' fullWidth name='country' required inputProps={{ type: "text" }} label={Text[lang].country}></TextField>
                  </ListItem>
               </> : ""}
               <span style={{ width: "100%", display: "flex", justifyContent: "center", padding: "5px 16px 20px 16px" }}>
                  <Button variant='contained' type='submit' fullWidth color='primary'>{Text[lang].btn}</Button>
               </span>

            </List>
         </form>
      </div>
   )
}

export default Shipping