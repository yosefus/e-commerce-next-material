import nc from 'next-connect';
import db from '../../../server/db';
import user from '../../../server/models/user';
import { signToken } from '../../../utils/auth';
import bcrypt from "bcryptjs"

const handler = nc();

handler.post(async (req, res) => {
   let result;
   try {
      let { email, password, rePassword, name } = req.body

      if (password !== rePassword) throw { message: "the passwords don't match each other", my: true }
      if (!email || !password || !rePassword || !name) throw { message: "missing data", my: true }

      await db.connect();

      let userFound = await user.findOne({ email })
      if (userFound) throw { message: "we already have a user with that email", my: true }

      let hashPass = bcrypt.hashSync(password)
      let newUser = await user.create({ email, password: hashPass, name })

      const token = await signToken(newUser)

      const sendUser = { token, _id: newUser._id, name: newUser.name, email: newUser.email }
      result = { code: 200, success: true, data: sendUser };
   } catch (error) {
      console.log(error);
      result = { code: error.code || 401, success: false, message: error.my ? error.message : "something went wrong" || error, my: error.my };
   }

   res.send(result);
});

export default handler;