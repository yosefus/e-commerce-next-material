import nc from 'next-connect';
import db from '../../../../server/db';
import order from '../../../../server/models/order';
import { isAuth } from '../../../../utils/auth';

const handler = nc();

handler.use(isAuth)

handler.put(async (req, res) => {
   let result;
   try {
      await db.connect();
      const updatedOrder = await order.findByIdAndUpdate(
         {
            isPaid: true,
            paidAt: Date.now(),
            paymentResult: {
               id: req.body.id,
               status: req.body.status,
               email_address: req.body.email_address,
            }
         }
      );

      if (!updatedOrder._id) throw ({ code: 404, message: "order not found", my: true })

      console.log("updatedOrder", updatedOrder);

      result = { code: 201, success: true, data: updatedOrder };
   } catch (error) {
      console.log(error);
      result = { code: error.code || 500, success: false, message: error.message || error };
   }
   res.send(result);
});