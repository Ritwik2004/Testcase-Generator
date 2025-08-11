import express from "express"
import { codeGenerator } from "../controller/ai.controller.js"

const AiRoute = express.Router()

// AiRoute.post("/generate-summary", generateTestCase)
AiRoute.post("/generate-code", codeGenerator)

export default AiRoute