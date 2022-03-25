import jwt from "jsonwebtoken"

export const signToken = (user) => {
   const { _id, email, isAdmin, name } = user;
   return jwt.sign({ _id, email, isAdmin, name }, process.env.JWT_SECRET, { expiresIn: "1d" })
}


