import {  Router } from "express";
import {createChat , findUserChats , findChat} from '../Middleware/chatMiddleware.mjs'

const router = Router()


router.post("/" , createChat)
router.get("/:userId" ,findUserChats )
router.get("/find/:firstId/:secondId" , findChat )


export default router