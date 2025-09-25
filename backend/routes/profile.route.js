import express from "express"
import { upprofile } from "../controllers/uploadprofile.js"
import multer from "../middleware/upload.js"
const route=express.Router()
route.post('/uploadprofile',multer,upprofile)


export default route