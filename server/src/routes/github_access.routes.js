import express from "express"
import { accessFiles, accessRepository } from "../controller/github.controller.js"

const AccessRepo = express.Router()

AccessRepo.get("/repos", accessRepository)
AccessRepo.get("/files/:woner/:repo", accessFiles)

export default AccessRepo