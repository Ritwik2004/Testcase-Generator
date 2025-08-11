import { History } from "../models/user.model.js";

export const getHistory = async (req,res)=>{
    const {username} = req.body;
    // console.log("Username from history : ",username)
    const histories = await History.find({username})
    // console.log(histories)
    res.json({success : true, message : histories})
}