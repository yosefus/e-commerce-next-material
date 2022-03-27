import { Step, StepLabel, Stepper } from '@mui/material'
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

   return (
      <Stepper style={{ margin: "1rem 0", background: "transparent" }} dir='ltr' activeStep={activeStep} alternativeLabel>
         {Text[lang].stepArr.map(step => (
            <Step key={step}>
               <StepLabel>{step}</StepLabel>
            </Step>))}
      </Stepper>
   )
}

export default CheckoutWizard