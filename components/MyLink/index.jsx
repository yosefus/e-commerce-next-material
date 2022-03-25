import React from 'react'
import Link from 'next/link'

function MyLink({ href, className, children }) {
   return (
      <Link href={href}><a className={className ? className : ""}>{children}</a></Link>
   )
}

export default MyLink