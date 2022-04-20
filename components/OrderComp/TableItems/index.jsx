import styled from '@emotion/styled'
import {
   Card, List, ListItem, Table, TableBody, TableCell, TableContainer,
   TableHead, TableRow, Typography
} from '@mui/material'
import MyLink from '../../MyLink'
import Image from 'next/image';


export default function TableItems({ Text, lang, cartItems }) {
   const StyledCell = styled(TableCell)({
      '&': { padding: 0, textAlign: "center", },
   }), StyledCard = styled(Card)({
      th: { padding: "1rem 0", background: "rgba(0,0,0,0.2)" },
   })

   console.log("table", cartItems);

   return (
      <StyledCard variant='outlined' className='card'>
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
                        {cartItems.map((item, i) => <TableRow key={`table${i}`}>
                           <StyledCell>
                              <Image src={item.image} width={80} height={50} alt={item.name["en"]} />
                           </StyledCell>
                           <StyledCell>
                              <MyLink href={item.slug ? `/product/${item.slug}` : "/"}>
                                 <Typography sx={{ textDecoration: item.slug ? "underline" : "none" }} color="secondary">{item.name[lang]} </Typography>
                              </MyLink>
                           </StyledCell>
                           <StyledCell> {item.quantity}</StyledCell>
                           <StyledCell>${item['price']}</StyledCell>
                        </TableRow>)}
                     </TableBody>
                  </Table>
               </TableContainer>
            </ListItem>
         </List>
      </StyledCard>
   )
}
