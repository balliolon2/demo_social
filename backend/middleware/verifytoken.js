import jwt from "jsonwebtoken"
import createError from "../utils/createError.js"
export const verifytoken=(req,res,next)=>{
  const token=req.headers["authorization"]
  if(!token){
    return res.status(401)
  }
  jwt.verify(token,process.env.SECRET,(err,decode)=>{
    if(err){
      createError(403,"token invalided")
    }
    next()
  })
}