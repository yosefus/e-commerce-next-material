import nc from 'next-connect';
import { isAuth } from "../../../utils/auth"

const handler = nc();

handler.use(isAuth)

handler.get(async (req, res) => {
   let result;

   try {
      result = { code: 200, success: true, data: process.env.PAYPAL_CLIENT_ID || "sb" };
   } catch (error) {
      result = { code: error.code || 500, success: false, msg: error.message || error };
   }

   res.send(result);
});

export default handler;
