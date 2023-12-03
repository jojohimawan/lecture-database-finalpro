import User from "../models/user.js";
import Joi from "joi";
import bcrypt  from "bcrypt";

const register = async(req, res) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });
    const validate = schema.validate(req.body);

    if(validate.error) {
        return res.status(400).json({
            message: validate.error.details[0].message,
        });
    } else {
        try {
            const data = req.body;
            data.password = await bcrypt.hash(data.password, 10);
            const user = new User(data);
            await user.save();

            return res.status(201).json({
                message: "User created",
            });
        } catch (error) {
            console.log("Controller Error: " + error)
            return res.status(500).json({
                message: error.message || error,
            });
        }
    }
}

const login = async(req, res) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });
    const validate = schema.validate(req.body);

    if(validate.error) {
        return res.status(400).json({
            message: validate.error.details[0].message,
        });
    } else {
        try {
            const data = req.body;
            const user = await User.findOne({username: data.username});
            
            if(user) {
                const passMatch = await bcrypt.compare(data.password, user.password);
                if(passMatch) {
                    return res.status(200).json({
                        message: "Login success",
                    });
                } else {
                    return res.status(400).json({
                        message: "Wrong credentials",
                    });
                }
            }  else {
                return res.status(500).json({
                    message: "User not found, please register first",
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
    register,
    login
}