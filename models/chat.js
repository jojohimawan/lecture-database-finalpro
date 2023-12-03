import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
    sender_id: {
        type: String,
        required: true,
    },
    receiver_id: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    is_deleted: {
        type: Boolean,
        required: true,
    },
    },
    { timestamps: true }
);

const Chat = new mongoose.model("Chat", chatSchema);

export default Chat;