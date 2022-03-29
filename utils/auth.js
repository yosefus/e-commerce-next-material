import jwt from "jsonwebtoken"

export const signToken = (user) => {
   const { _id, email, isAdmin, name } = user;
   return jwt.sign({ _id, email, isAdmin, name }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

export const isAuth = (req, res, next) => {
   const { authorization } = req.headers;

   if (!authorization) res.send({ code: 401, success: false, message: "token is not suppiled", my: true })

   jwt.verify(authorization, process.env.JWT_SECRET, (err, decode) => {
      if (err) res.send({ code: 401, success: false, message: "token is not valid", my: true })
      else {
         req.user = decode;
         next()
      }
   })

}
