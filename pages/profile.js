import React, { useContext, useEffect, useReducer } from 'react'
// next
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
// material 
import { Alert, Button, CircularProgress, List, ListItem, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system';
import { toast } from 'react-toastify';

import { ACTION_TYPES, Store } from '../utils/Store';
import { apiReq } from '../functions/apiFunction';
import { profile as Text } from '../utils/text';

const reducer = (state, action) => {
   switch (action.type) {
      case "loading":
         return { ...state, loading: true, error: "" }
      case "error":
         return { ...state, error: action.payload, loading: false }
      case "fetchUser": {
         return { ...state, userInfo: action.payload, loading: false, error: "" }
      }
      case "updateUser": {
         return { ...state, userInfo: action.payload, loading: false, error: "" }
      }
      default: return state
   }
}

function MyOrders() {
   const { state: { lang, user }, dispatch: mainDispatch } = useContext(Store),
      [{ loading, error, userInfo }, dispatch] = useReducer(reducer, { loading: false, error: "", userInfo: {} }),
      router = useRouter()

   useEffect(() => {
      if (!user) {
         return router.push("/login?redirect=/profile")
      }
      getUser()
   }, [user])

   const getUser = async () => {
      try {
         dispatch({ type: "loading", payload: true })
         const user = await apiReq({ path: `/users/one`, method: `get` })
         if (user.error) throw user
         dispatch({ type: "fetchUser", payload: user })
      } catch (error) {
         dispatch({ type: "error", payload: error.message || "something went wrong..." })
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      let values = {}
      Object.values(e.target).forEach(v => v.value ? v.name ? values[v.name] = v.value : null : null)
      try {
         if (values.pass != values.repass) throw ({ message: "the passwords is not the same" })
         dispatch({ type: "loading", payload: true })
         const user = await apiReq({ path: `/users/one`, method: `put`, body: values })
         if (user.error) throw user
         dispatch({ type: "fetchUser", payload: user })
         toast.success("you going to disconnect now, please login again")

         setTimeout(() => {
            mainDispatch({ type: ACTION_TYPES.USER_LOGOUT })
         }, 5000);

      } catch (error) {
         dispatch({ type: "error", payload: error.message || "something went wrong..." })
      }
   }

   const StyledDiv = styled("div")({
      ".prog": { margin: "0 auto" },
      ".head": { display: "flex", justifyContent: "center" },
      "h1": { fontSize: "2rem", margin: "2rem auto" },
      ".submitSpan": { width: "100%", display: "flex", justifyContent: "center", padding: "5px 16px 20px 16px" },
      "form": { maxWidth: "600px", margin: "auto" },
      ".warning": { margin: " 5פס 16px" }
   })

   return (
      <StyledDiv>
         <div className='head'>
            <div>
               <Typography textAlign="center" variant="h1">{Text[lang].head}</Typography>
               {error && <Alert severity="error">{error}</Alert>}
               {loading && <CircularProgress className='prog' />}
            </div>
         </div>

         <form onSubmit={handleSubmit} >
            <Typography component='h2' variant='h2'>{Text[lang]["h2"]}</Typography>
            <List dir='ltr' >
               <ListItem>
                  <TextField variant='outlined' defaultValue={userInfo?.name || ""} fullWidth name='name' required inputProps={{ type: "text" }} label={Text[lang].name}></TextField>
               </ListItem>
               <ListItem>
                  <TextField variant='outlined' defaultValue={userInfo?.email || ""} fullWidth name='email' required inputProps={{ type: "email" }} label={Text[lang].email}></TextField>
               </ListItem>
               <ListItem>
                  <TextField variant='outlined' fullWidth name='password' inputProps={{ type: "password" }} label={Text[lang].pass}></TextField>
               </ListItem>
               <ListItem>
                  <TextField variant='outlined' fullWidth name='rePassword' inputProps={{ type: "password" }} label={Text[lang].repass}></TextField>
               </ListItem>

               <Alert className='warning' severity="warning">{Text[lang]["warning"]}</Alert>
               <span className='submitSpan'>
                  <Button variant='contained' type='submit' fullWidth color='primary'>{Text[lang]["submit"]}</Button>
               </span>

               {error && <Alert className='warning' severity="error">{error}</Alert>}

            </List>
         </form>
      </StyledDiv>
   )
}

export default dynamic(() => Promise.resolve(MyOrders), { ssr: false });
