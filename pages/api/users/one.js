import nc from 'next-connect';
import db from '../../../server/db';
import { isAuth } from '../../../utils/auth';
import User from '../../../server/models/user';
import bcrypt from "bcryptjs"


const handler = nc();

handler.use(isAuth)

handler.get(async (req, res) => {
   let result;

   try {
      await db.connect();

      const foundUser = await User.findById(req.user._id);
      const { name, email } = foundUser
      if (!foundUser) throw ({ my: true, message: "sorry, we can't found your user", code: 404 })
      result = { code: 200, success: true, data: { name, email } };
   } catch (error) {
      result = { code: error.code || 500, success: false, message: error.message || error, my: error.my, error: true };
   }

   res.send(result);
});

handler.put(async (req, res) => {
   let result;
   const { email, name, password } = req.body

   try {
      await db.connect();

      let values = {}
      Object.keys(req.body).forEach((v) => {
         if (v == "email" || v === "name") values[v] = req.body[v]
         if (v == "password") values[v] = bcrypt.hashSync(req.body[v])
      })

      if (!email && !name && !password) throw ({ my: true, message: "missing data, please check again", code: 404 })

      const foundUser = await User.findById(req.user._id);
      if (!foundUser) throw ({ my: true, message: "sorry, we can't found your user", code: 404 })

      const updatedUser = await User.findByIdAndUpdate(req.user._id, { ...values }, { new: true })
      result = { code: 200, success: true, data: updatedUser };
   } catch (error) {
      result = { code: error.code || 500, success: false, message: error.message || error, my: error.my, error: true };
   }

   res.send(result);
});

export default handler;
