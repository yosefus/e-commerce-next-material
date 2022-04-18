import nc from 'next-connect';
import db from '../../../server/db';
import Order from '../../../server/models/order';
import { isAuth } from '../../../utils/auth';

const handler = nc();

handler.use(isAuth)


handler.get(async (req, res) => {
   let result;

   try {
      await db.connect();

      const orders = await Order.find({ user: req.user._id, isDeleted: false });
      if (req.user._id != orders[0].user) throw ({ my: true, message: "sorry, is not your order to watch", code: 403 })
      result = { code: 200, success: true, data: orders };
   } catch (error) {
      result = { code: error.code || 500, success: false, message: error.message || error, my: error.my };
   }

   res.send(result);
});

export default handler;
