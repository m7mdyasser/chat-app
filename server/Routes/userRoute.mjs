import {  Router } from "express";
import {registerUser , bodyValidator, loginUser ,findUser ,getUsers} from "../Middleware/userMiddleware.mjs"


const router = Router()

router.post("/register", bodyValidator() , registerUser)
router.post("/login" , loginUser)
router.get("/find/:id" , findUser)
router.get("/find" , getUsers)

export default router

