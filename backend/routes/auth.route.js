import express from "express"
import {register,login} from "../controllers/auth.controller.js"
import {validate,registerscheema,loginscheema} from "../utils/validate.js"
import { verifytoken } from "../middleware/verifytoken.js"
const route =express.Router()


route.post('/api/auth',verifytoken,(req,res)=>res.json({msg:"WELLCOME TO DASHBOARD"}))
route.post('/register',validate(registerscheema),register)
route.post('/login',validate(loginscheema),login)



export default route