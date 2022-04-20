import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';


const handler = nc();

handler.use(isAuth)

handler.post(async (req, res) => {
   let result;
   try {
      result = { code: 200, success: true, data: { success: true } };
   } catch (error) {
      console.log(error);
      result = { code: error.code || 401, success: false, message: error.my ? error.message : "something went wrong" || error, my: error.my };
   }

   res.send(result);
});

export default handler;
