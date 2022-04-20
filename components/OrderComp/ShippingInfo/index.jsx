import { Card, List, ListItem, Typography } from '@mui/material'
import React from 'react'

export default function ShippingInfo({ Text, lang, shippingAddress, status }) {
   return (
      <Card variant='outlined' className='card'>
         <List>
            <ListItem>
               <Typography variant='h2' component="h2"> {Text[lang].shippingAddress}</Typography>
            </ListItem>
            <ListItem>
               {shippingAddress.fullName}{" "}, {shippingAddress.address}{" "}, {shippingAddress.city}{" "}, {shippingAddress.country}{" "}, {shippingAddress.postalCode}
            </ListItem>
            {status ?
               <ListItem>
                  <Typography fontWeight="bold">  {Text[lang].status}:  </Typography>
                  {status}
               </ListItem>
               : ""}
         </List>
      </Card>
   )
}
