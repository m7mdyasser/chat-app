import { Router } from "express";
import userRoute from "./userRoute.mjs"
import chatRoute from './chatRoute.mjs'
import messageRoute from './messageRoute.mjs'

const router = Router()

router.use("/api/users" , userRoute)
router.use("/api/chats" , chatRoute)
router.use("/api/messages" , messageRoute)


export default router