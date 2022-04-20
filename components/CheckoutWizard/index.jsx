import { Step, StepLabel, Stepper } from '@mui/material'
import { styled } from '@mui/styles';
import React, { useContext } from 'react'
import { Store } from '../../utils/Store'

const Text = {
   he: {
      stepArr: ["התחברות", "כתובת למשלוח", "שיטת תשלום", "השלמה"]
   },
   en: {
      stepArr: ["login", "shipping address", "payment method", "place order"]
   }
}

function CheckoutWizard({ activeStep = 0 }) {
   const { state: { lang } } = useContext(Store);

   const StyledStepper = styled(Stepper)({
      margin: "1rem 0"
   })

   return (
      <StyledStepper dir='ltr' activeStep={activeStep} alternativeLabel>
         {Text[lang].stepArr.map(step => (
            <Step className='vi' key={step}>
               <StepLabel>{step}</StepLabel>
            </Step>))}
      </StyledStepper>
   )
}

export default CheckoutWizard