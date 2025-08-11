import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username : {
            type : String,
            required : true
        },
        fileName : {
            type : String,
            required : true
        },
        response : {
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
)


export const History = mongoose.model("History",userSchema)