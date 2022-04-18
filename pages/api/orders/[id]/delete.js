import nc from 'next-connect';
import db from '../../../../server/db';
import order from '../../../../server/models/order';
import { isAuth } from '../../../../utils/auth';

const handler = nc();

handler.use(isAuth)

handler.delete(async (req, res) => {
   let result;
   try {
      await db.connect();
      const updatedOrder = await order.findByIdAndUpdate(req.query.id,
         { isDeleted: true }, { new: true });

      if (!updatedOrder._id) throw ({ code: 404, message: "order not found", my: true })

      result = { code: 201, success: true, data: updatedOrder };
   } catch (error) {
      console.log(error);
      result = { code: error.code || 500, success: false, message: error.message || error, error: true };
   }
   res.send(result);
});

export default handler;
