import React, { useContext, useEffect, useReducer } from 'react';
// material
import { Card, List, ListItem, Grid, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/system';
// next
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Store } from '../../utils/Store';
import { apiReq } from '../../functions/apiFunction';
import { OrderSummary, PaymentInfo, ShippingInfo, TableItems, Title } from '../../components'
import { placeOrder as Text } from '../../utils/text'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
   switch (action.type) {
      case "loading":
         return { ...state, loading: true, error: "" }
      case "error":
         return { ...state, error: action.payload }
      case "order": {
         if (!action.payload._id) return { ...state, order: {}, error: "something went wrong..." }
         return { ...state, order: action.payload, loading: false, error: "" }
      }
      case "payReq": {
         return { ...state, loadingPay: true }
      }
      case "payFail": {
         return { ...state, loadingPay: false, errorPay: action.payload }
      }
      case "paySuccess": {
         return { ...state, loadingPay: false, successPay: true }
      }
      default: return state
   }
}

function Order({ params }) {
   const orderId = params.id,
      [{ isPending }, paypalDispatch] = usePayPalScriptReducer(),
      router = useRouter(),
      { state: { lang, user } } = useContext(Store),
      [{ loading, error, order, loadingPay, successPay, errorPay }, dispatch] = useReducer(reducer, { loading: true, error: "", order: {} }),
      { shippingAddress, paymentMethod, shippingPrice, tax, totalPrice, isDelivered, isPaid, DeliveredAt, paidAt } = order,
      itemsNum = order._id && order?.cartItems.reduce((acc, c) => acc + c.quantity, 0) || 0

   useEffect(() => {
      if (!user) router.push(`/login?redirect=/order/${orderId}`)
      if (order._id && !paymentMethod && !successPay) router.push(`/login?redirect=/payment`)

      const loadPaypalScript = async () => {
         const clientID = await apiReq({ path: "/keys/paypal" })
         paypalDispatch({ type: "resetOptions", value: { "client-id": clientID, currency: "USD" } })
         paypalDispatch({ type: "setLoadingStatus", value: "pending" })
      }

      const getData = async () => {
         dispatch({ type: "loading", payload: true })
         const order = await apiReq({ path: `/orders/${orderId}`, method: `get` })

         if (!order._id || order._id != orderId) return dispatch({ type: "error", payload: order.message || "something went wrong..." })
         dispatch({ type: "order", payload: order })

         loadPaypalScript()
      }

      if (orderId || successPay) getData()

   }, [paymentMethod, orderId, successPay])

   // paypal function
   const createOrder = (data, actions) => actions.order.create(
      { purchase_units: [{ amount: totalPrice }] }
   ).then(orderID => { return orderID })

   // paypal function
   const onApprove = (data, actions) => actions.order.capture().then(async (details) => {
      dispatch({ type: "payReq" })
      const updateOrder = await apiReq({ path: `orders/${orderId}/pay`, method: "put", body: details })

      if (!updateOrder._id) {
         const msg = `${updateOrder.message} ,we didn't update your paymant status, plaese contact us`
         toast.error(msg)
         return dispatch({ type: "payFail", payload: msg })
      }

      dispatch({ type: "paySuccess", payload: updateOrder })
      toast.success("payment approve!")
   })

   // paypal function
   const onError = () => {
      const msg = `sorry your payment didn't approve`
      dispatch({ type: "payFail", payload: msg })
      toast.error(msg)
   }

   const StyledList = styled(List)({
      '& .title': { textAlign: lang === 'he' ? 'right' : 'left' },
      '& .price': { textAlign: lang === 'he' ? 'left' : 'right' },
   }),
      StyledDiv = styled(Grid)({
         "& .fullWidth": { width: "100%" },
         "& h1, h2, h3, h4, h5, h6": { fontWeight: "bold" },
         "& .card": { margin: "1rem 0" }
      })

   if (error) return <div></div>
   if (loading) return <CircularProgress />

   if (order._id) {
      return (
         <StyledDiv>
            <Title title={`${Text[lang].h1Order} ${orderId}`} />

            <Grid container spacing={3} >

               <Grid item md={9} xs={12}>
                  {/* shipping address */}
                  <ShippingInfo {...{
                     lang, Text, shippingAddress,
                     status: isDelivered ? ` ${Text[lang]["delivered"]} ${DeliveredAt}` : ` ${Text[lang]["notDelivered"]}`
                  }} />
                  {/* payment method */}
                  <PaymentInfo {...{
                     Text, paymentMethod, lang,
                     status: isPaid ? ` ${Text[lang]["paid"]} ${paidAt} ` : ` ${Text[lang]["notPaid"]}`
                  }} />
                  {/* items table */}
                  <TableItems {...{ lang, cartItems: order.cartItems, Text }} />
               </Grid>

               {/* detailes side bar */}
               <Grid item md={3} xs={12} style={{ textAlign: lang === "en" ? "left" : "right" }}>
                  <Card variant='outlined' className='card'>
                     <StyledList>
                        <OrderSummary {...{ Text, lang, itemsNum, tax, totalPrice, shippingPrice }} />
                        <ListItem>
                           <Alert severity="error">this website is fake, pay with paypal is not connected.</Alert>
                        </ListItem>

                        {!isPaid &&
                           <ListItem>
                              {isPending ?
                                 <CircularProgress />
                                 : <PayPalButtons className='fullWidth' createOrder={createOrder} onApprove={onApprove} onError={onError} />}
                              {errorPay && <Alert severity="error">{errorPay}</Alert>}
                              {loadingPay && <CircularProgress />}
                           </ListItem>}

                     </StyledList>
                  </Card>
               </Grid>
            </Grid>
         </StyledDiv >

      )
   } else {
      return <div> </div>
   }
}

export async function getServerSideProps({ params }) {
   return { props: { params } }
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
