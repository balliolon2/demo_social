import createError from "../utils/createError.js" 
import prisma from "../config/prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const register = async(req, res, next) => {
  try {
    const {email,username,password}=req.body
    const user=await prisma.users.findFirst({
      where:{
        email
      }
    })
    if(user){
      createError(400,"Email already exsist!!")
    }
    const hashpass=bcrypt.hashSync(password,10)
    await prisma.users.create({
      data:{
        email,
        username,
        pass_hash:hashpass
      }
    })
    res.json({msg:"register success"})
  }

  catch (err) {
    next(err)
  }
}
export const login=async(req,res,next)=>{
try {
  const { email, password } = req.body;

    // 2 Check Email
    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      createError(400, "Email or Password is Invalid!!");
    }

    const checkPassword = bcrypt.compareSync(password, user.pass_hash);

    if (!checkPassword) {
      createError(400, "Email or Password is Invalid!!");
    }
    console.log("pass")
    //  4. Generate Token
    const payload = {
      id: user.user_id,
      username: user.username,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });
    res.json({
      message: "Login Success!!!",
      payload: payload,
      token: token,
    });
} catch (error) {
  next(error)
}
}
