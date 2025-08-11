import express from "express"
import { callback, login } from "../controller/github.controller.js"

const githubAuthRouter = express.Router()


githubAuthRouter.get('/login', login)
githubAuthRouter.get('/callback', callback)

export default githubAuthRouter