import React from 'react'
import Link from 'next/link'

function MyLink({ href, className, children, style }) {
   return (
      <Link href={href ? href : "/"}>
         <a style={style} className={className ? className : ""}>{children}</a>
      </Link>
   )
}

export default MyLink