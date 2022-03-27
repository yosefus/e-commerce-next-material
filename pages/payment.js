import React, { useContext, useEffect, useState } from 'react'
import { ACTION_TYPES, Store } from '../utils/Store'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { CheckoutWizard } from '../components'
import { Alert, Button, FormControl, FormControlLabel, List, ListItem, Radio, RadioGroup, Typography } from '@mui/material'
import { payment as Text } from '../utils/text'

export default function Payment() {
   const { state: { lang, cart: { shippingAddress } }, dispatch } = useContext(Store),
      router = useRouter(),
      [payMethod, setPayMethod] = useState(""),
      [error, setError] = useState("")

   useEffect(() => {
      !shippingAddress.address ? router.push('/shipping') : setPayMethod(Cookies.get("payMethod") || "")
   }, [shippingAddress])


   const handleSubmit = (e) => {
      setError()
      e.preventDefault()
      if (!payMethod) return setError("payment method is required")
      dispatch({ type: ACTION_TYPES.SAVE_PAYMENT_METHOD, payload: payMethod })
      router.push("/place-order")
   }

   return (
      <div>
         <CheckoutWizard activeStep={2} />

         <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>

            <Typography style={{ textAlign: "center", margin: "3rem 0" }} component="h1" variant='h1'>
               {Text[lang].h1}
            </Typography>

            <List>
               <ListItem>
                  <FormControl required>
                     <RadioGroup
                        aria-label={Text[lang].h1}
                        name="paymentMethod"
                        value={payMethod}
                        onChange={(e) => setPayMethod(e.target.value)}>
                        <FormControlLabel label={Text[lang].paypal} value="paypal" control={<Radio />}></FormControlLabel>
                        <FormControlLabel label={Text[lang].cash} value="cash" control={<Radio />}></FormControlLabel>
                     </RadioGroup>
                  </FormControl>
               </ListItem>
               {error && <Alert severity="error">{error}</Alert>}

               <ListItem>
                  <Button type='submit' variant='contained' fullWidth color='primary'>
                     {Text[lang].continue}
                  </Button>
               </ListItem>
               <ListItem>
                  <Button type='submit' variant='contained' color='secondary' fullWidth onClick={() => router.push("/shipping")} >
                     {Text[lang].back}
                  </Button>
               </ListItem>
            </List>
         </form>
      </div>
   )
}
