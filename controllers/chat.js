import Chat from "../models/chat.js";
import Joi from "joi";

const sendChat = async(req, res) => {
    const schema = Joi.object({
        sender_id:  Joi.string().required(),
        receiver_id: Joi.string().required(),
        message: Joi.string().required(),
        is_deleted: Joi.boolean().required(),
    });
    const validate = schema.validate(req.body);

    if(validate.error) {
        return res.status(400).json({
            message: validate.error.details[0].message,
        });
    } else {
        try {
            const data = req.body;
            const chat = new Chat(data);
            await chat.save();

            return res.status(201).json({
                message: "Chat sent",
            });
        } catch (error) {
            console.log("Controller Error: " + error)
            return res.status(500).json({
                message: error.message || error,
            });
        }
    }
}

const getChat = async(req, res) => {
    const schema = Joi.object({
        sender_id:  Joi.string().required(),
        receiver_id: Joi.string().required(),
    });
    const validate = schema.validate(req.body);

    if(validate.error) {
        return res.status(400).json({
            message: validate.error.details[0].message,
        });
    } else {
        try {
            const data = req.body;
            const chat = await Chat.find({sender_id: data.sender_id, receiver_id: data.receiver_id});

            if (chat) {
                return res.status(200).json({
                    message: "Chat found",
                    data: chat,
                });
            }  else {
                return res.status(404).json({
                    message: "Chat not found",
                });
            }
        } catch (error) {
            console.log("Controller Error: " + error)
            return res.status(500).json({
                message: error.message || error,
            });
        }
    }
}

const deleteChat = async(req, res) => {
    const schema = Joi.object({
        _id:  Joi.string().required(),
    });
    const validate = schema.validate(req.body);

    if(validate.error) {
        return res.status(400).json({
            message: validate.error.details[0].message,
        });
    } else {
        try {
            const data = req.body;
            const chat = await Chat.findOne({_id: data._id});

            if (chat) {
                await Chat.findOneAndUpdate({_id: data._id}, {is_deleted: true});
                return res.status(200).json({
                    message: "Chat deleted",
                });
            }  else {
                return res.status(404).json({
                    message: "Chat not found",
                });
            }
        } catch (error) {
            console.log("Controller Error: " + error)
            return res.status(500).json({
                message: error.message || error,
            });
        }
    }
}

export default {
    sendChat,
    getChat,
    deleteChat
}