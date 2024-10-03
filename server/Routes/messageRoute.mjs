import {  Router } from "express";
import {createMessage , getMessages} from '../Middleware/messageMiddleware.mjs'

const router = Router()

router.post("/", createMessage )
router.get("/:chatId" , getMessages )

export default router