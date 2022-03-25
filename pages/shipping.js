import React, { useContext, useEffect } from 'react'
import { Store } from '../utils/Store';
import { useRouter } from 'next/router'

function Shipping() {
   const { state: { user } } = useContext(Store),
      router = useRouter()

   useEffect(() => !user && router.push("/login?redirect=/shipping"), [user])

   return (
      <div>Shipping</div>
   )
}

export default Shipping