import nc from 'next-connect';
import db from '../../../server/db';
import user from '../../../server/models/user';
import bcrypt from "bcryptjs"
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
   let result;
   try {
      let { email, password } = req.body
      if (!email || !password) throw { message: "missing data", my: true }

      await db.connect();
      let userFound = await user.findOne({ email }, "+password")

      if (!userFound || !bcrypt.compareSync(password, userFound.password)) throw { message: "please check your data", my: true }

      const token = await signToken(userFound)

      const sendUser = { token, _id: userFound._id, name: userFound.name, email: userFound.email }
      result = { code: 200, success: true, data: sendUser };
   } catch (error) {
      console.log(error);
      result = { code: error.code || 401, success: false, msg: error.my ? error.message : "something went wrong" || error, my: error.my };
   }

   res.send(result);
});

export default handler;
