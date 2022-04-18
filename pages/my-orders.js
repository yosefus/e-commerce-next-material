import React, { useContext, useEffect, useReducer } from 'react'
// next
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
// material
import { Alert, Button, Card, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import { Store } from '../utils/Store';
import { apiReq } from '../functions/apiFunction';
import { myOrders as Text } from '../utils/text';
import { Confirm, MyLink } from '../components';
import { styled } from '@mui/system';
import { DeleteForeverOutlined } from '@mui/icons-material';

const reducer = (state, action) => {
   switch (action.type) {
      case "loading":
         return { ...state, loading: true, error: "" }
      case "error":
         return { ...state, error: action.payload, loading: false }
      case "fetchOrders": {
         if (!action.payload[0]?._id) return { ...state, orders: [], error: "something went wrong..." }
         return { ...state, orders: action.payload, loading: false, error: "" }
      }
      default: return state
   }
}

function MyOrders() {
   const { state: { lang, user } } = useContext(Store),
      router = useRouter(),
      [{ loading, error, orders }, dispatch] = useReducer(reducer, { loading: false, error: "", orders: [] })

   useEffect(() => {
      if (!user) router.push("/login?redirect=/my-orders")
      getOrders()
   }, [])

   const getOrders = async () => {
      try {
         dispatch({ type: "loading", payload: true })
         const orders = await apiReq({ path: `/orders/all`, method: `get` })
         if (orders.error) throw orders
         dispatch({ type: "fetchOrders", payload: orders })
      } catch (error) {
         dispatch({ type: "error", payload: error.message || "something went wrong..." })
      }
   }

   const deleteOrder = async (id) => {
      try {
         const deleted = await apiReq({ path: `/orders/${id}/delete`, method: "delete" })
         if (deleted.error) throw deleted
         getOrders()
      } catch (error) {
         console.log("delete error my-orders", error.message || error);
      }
   }

   const StyledDiv = styled("div")({
      "& .head": {
         display: "flex", justifyContent: "center"
      },
      "h1": {
         fontSize: "2rem",
         margin: "2rem auto"
      },
      "& td, th": {
         textAlign: "start"
      },
      "& tr:nth-of-type(even)": {
         background: "rgba(0,0,0,0.2)"
      },
      ".card": { margin: "0 0 2rem 0" },
      ".action": { display: "flex", gap: ".5rem" }
   })

   return (
      <StyledDiv>

         <div className='head'>
            <div>
               <Typography textAlign="center" variant="h1">{Text[lang].h1}</Typography>
               {error && <Alert severity="error">{error}</Alert>}
               {loading && <CircularProgress />}
            </div>
         </div>

         {orders.length ?
            <Card className='card'>
               <TableContainer>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <TableCell>{Text[lang]['id']}</TableCell>
                           <TableCell>{Text[lang]['date']}</TableCell>
                           <TableCell>{Text[lang]['total']}</TableCell>
                           <TableCell>{Text[lang]['paid']}</TableCell>
                           <TableCell>{Text[lang]['delivered']}</TableCell>
                           <TableCell>{Text[lang]['action']}</TableCell>
                        </TableRow>
                     </TableHead>

                     <TableBody>
                        {orders.map((order, i) =>
                           <TableRow key={`table${i}`} >
                              <TableCell>  {order._id.substring(order._id.length - 4, order._id.length)}</TableCell>
                              <TableCell> {order.createdAt}</TableCell>
                              <TableCell>${order.totalPrice}</TableCell>
                              <TableCell>
                                 {order.isPaid ? order.paidAt : Text[lang]["no"]}
                              </TableCell>
                              <TableCell>
                                 {order.isDelivered ? order.DeliveredAt : Text[lang]["no"]}
                              </TableCell>
                              <TableCell className='action'>
                                 <MyLink href={`/order/${order._id}`}>
                                    <Button >
                                       {Text[lang]["details"]}
                                    </Button>
                                 </MyLink>
                                 <Confirm
                                    btnText={<DeleteForeverOutlined />}
                                    msgText={Text[lang]["deleteMessage"]}
                                    onApprove={() => deleteOrder(order._id)}
                                 />
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TableContainer>
            </Card>
            : ""}
      </StyledDiv>
   )
}

export default dynamic(() => Promise.resolve(MyOrders), { ssr: false });
