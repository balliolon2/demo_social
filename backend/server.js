import express from "express"
import morgan from "morgan"
import cors from "cors"
import authroute from "./routes/auth.route.js"
import profileroute from "./routes/profile.rote.js"
const app =express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/',authroute)
app.use('/',profileroute)



app.use((err,req,res,next)=>{
  res.status(err.code||500).json({msg:err.message||"server error"})
})
const port =3000
app.listen(port,()=>{console.log(`start with port ${port}`)})