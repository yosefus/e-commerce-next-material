import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import React from 'react'

const StyledH1 = styled(Typography)({
   '&': {
      textAlign: "center",
      margin: "3rem 0",
      fontSize: "2rem",
      fontWeight: "bold"
   }
})

function Title({ title }) {
   return (
      <StyledH1 component={'h1'} variant={'h1'}>{title}</StyledH1>
   )
}

export default Title