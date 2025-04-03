import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    name: String,
    message: String,
    timestamp: Date
})

export const ChatModel = mongoose.model("Chat", chatSchema);