import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, List, ListItem, TextField, Typography, Alert } from '@mui/material'
import { ACTION_TYPES, Store } from '../utils/Store'
import { apiReq } from '../functions/apiFunction'

const Text = {
   en: {
      h1login: "login",
      email: "email",
      pass: "password",

   },
   he: {
      h1login: "התחברות",
      email: "דואר אלקטרוני",
      pass: "סיסמא"
   }
}

function Login() {
   const { state: { lang, user }, dispatch } = useContext(Store),
      [error, setError] = useState(),
      router = useRouter();

   useEffect(() => user && router.push(router.query.redirect || "/"), [user])

   const handleSubmit = async (e) => {
      e.preventDefault()
      setError()

      let values = {}
      Object.values(e.target).forEach(e => e.name ? values[e.name] = e.value : null)
      const res = await apiReq({ method: "post", path: "/users/login", body: values })

      if (!res._id) return setError(res.msg)

      dispatch({ type: ACTION_TYPES.USER_LOGIN, payload: res })
   }

   return (
      <div>
         <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
            <Typography component='h1' variant='h1'>{Text[lang].h1login}</Typography>
            <List dir='ltr' >
               <ListItem>
                  <TextField variant='outlined' fullWidth name='email' inputProps={{ type: "email" }} label={Text[lang].email}></TextField>
               </ListItem>
               <ListItem>
                  <TextField variant='outlined' fullWidth name='password' inputProps={{ type: "password" }} label={Text[lang].pass}></TextField>
               </ListItem>
               <span style={{ width: "100%", display: "flex", justifyContent: "center", padding: "5px 16px 20px 16px" }}>
                  <Button variant='contained' type='submit' fullWidth color='primary'>{Text[lang].h1login}</Button>
               </span>
               {error && <Alert style={{ margin: " 0 16px" }} severity="error">{error}</Alert>}

            </List>
         </form>
      </div>
   )
}

export default Login