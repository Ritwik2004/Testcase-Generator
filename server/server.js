import express from "express";
import cors from "cors";
import 'dotenv/config';
import githubAuthRouter from "./src/routes/github_auth.routes.js";
import AccessRepo from "./src/routes/github_access.routes.js";
import AiRoute from "./src/routes/ai.route.js";
import DBconnection from "./src/database/db.js";
import userRoute from "./src/routes/user.route.js";

const app = express()

app.use(cors(
    {
        origin : process.env.CORS_ORIGIN,
        credentials : true
    }
))
app.use(express.json())

app.get('/', (req,res)=>"server is live")
app.use("/api/auth", githubAuthRouter)
app.use("/api/auth/github/", AccessRepo)
app.use("/api/auth/AI",AiRoute)
app.use("/api/auth/user",userRoute)

DBconnection()

const Port = process.env.PORT || 6000;
app.listen(Port, ()=>console.log(`Server is running on port no : ${Port}`))
