import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, List, ListItem, TextField, Typography, Alert } from '@mui/material'
import { ACTION_TYPES, Store } from '../utils/Store'
import { apiReq } from '../functions/apiFunction'
import { login as Text } from '../utils/text'
import { CheckoutWizard } from '../components'
// import { styled } from '@mui/system';


function Login() {
   const { state: { lang, user }, dispatch } = useContext(Store),
      [error, setError] = useState(),
      [login, setLogin] = useState(true),
      router = useRouter();

   useEffect(() => user && router.push(router.query.redirect || "/"), [user])

   const handleSubmit = async (e) => {
      e.preventDefault()
      setError()

      let values = {}
      Object.values(e.target).forEach(e => e.name ? values[e.name] = e.value : null)
      const res = await apiReq({ method: "post", path: `/users/${login ? "login" : "register"}`, body: values })

      console.log(res);
      if (!res._id) return setError(res.msg)

      dispatch({ type: ACTION_TYPES.USER_LOGIN, payload: res })
   }

   return (
      <div>
         {router?.query?.redirect == "/shipping" && <CheckoutWizard />}
         <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
            <Typography component='h1' variant='h1'>{Text[lang][login ? "h1login" : "h1register"]}</Typography>
            <List dir='ltr' >

               {!login && <>
                  <ListItem>
                     <TextField variant='outlined' fullWidth name='name' required inputProps={{ type: "text" }} label={Text[lang].name}></TextField>
                  </ListItem>
               </>}

               <ListItem>
                  <TextField variant='outlined' fullWidth name='email' required inputProps={{ type: "email" }} label={Text[lang].email}></TextField>
               </ListItem>
               <ListItem>
                  <TextField variant='outlined' fullWidth name='password' required inputProps={{ type: "password" }} label={Text[lang].pass}></TextField>
               </ListItem>

               {!login && <>
                  <ListItem>
                     <TextField variant='outlined' fullWidth name='rePassword' required inputProps={{ type: "password" }} label={Text[lang].repass}></TextField>
                  </ListItem>
               </>}

               <ListItem dir={lang === "he" ? 'rtl' : "ltr"}>
                  {Text[lang][login ? "notYet" : "already"]}
                  <Button onClick={() => setLogin(!login)}> {Text[lang][!login ? "h1login" : "h1register"]} </Button>
               </ListItem>

               <span style={{ width: "100%", display: "flex", justifyContent: "center", padding: "5px 16px 20px 16px" }}>
                  <Button variant='contained' type='submit' fullWidth color='primary'>{Text[lang][login ? "h1login" : "h1register"]}</Button>
               </span>
               {error && <Alert style={{ margin: " 0 16px" }} severity="error">{error}</Alert>}

            </List>
         </form>
      </div>
   )
}

export default Login