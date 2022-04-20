import { Card, List, ListItem, Typography } from '@mui/material'
import React from 'react'

export default function PaymentInfo({ Text, paymentMethod, lang, status }) {
   return (
      <Card variant='outlined' className='card'>
         <List>
            <ListItem>
               <Typography variant='h2' component="h2"> {Text[lang].paymentMethod} </Typography>
            </ListItem>
            <ListItem> {paymentMethod} </ListItem>
            {status ?
               <ListItem>
                  <Typography fontWeight="bold">  {Text[lang].status}: </Typography>
                  {status}
               </ListItem> :
               ""}
         </List>
      </Card>
   )
}
