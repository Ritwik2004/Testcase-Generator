import express from "express"
import { getHistory } from "../controller/user.controller.js"

const userRoute = express.Router()

userRoute.post('/history',getHistory)

export default userRoute