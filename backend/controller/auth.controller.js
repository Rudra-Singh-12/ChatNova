import User from "../model/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/genToken.js";
import { sendWelcomeEmail } from "../Email/emailHandler.js";
import { ENV } from "../utils/ENV.js";


export const signup = async (req, res) => {
    const { fullName, email, password } = req.body
    try {
        if (!fullName || !email || !password) {
            return res
                .status(400)
                .json({
                    message: "All fileds are required."
                })
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({
                    message: "Password length must be atleast be  6 characters."
                })
        }
        // check if email is valid
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return res
                .status(400)
                .json({
                    message: "Invalid Email"
                })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res
                .status(400)
                .json({
                    message: "Email Already Exists, Try With Different email."
                })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashPassword
        })

        if (newUser) {

            const saveUser = await newUser.save()
            const token = generateToken(res, User._id)


            res
                .status(200)
                .json({
                    _id: newUser._id,
                    email: newUser.email,
                    fullName: newUser.fullName,
                    message: "user is created Successfully."
                })

            try {
                await sendWelcomeEmail(saveUser.email, saveUser.fullName, ENV.CLIENT_URL);
            } catch (error) {

            }

        } else {
            return res
                .status(400)
                .json({
                    message: "Invalid user data."
                })
        }


    } catch (error) {
        console.log("Error in sign-Up Controller " + error.message)
        return res
            .status(500)
            .json({
                message: "Internal Server Error."
            })
    }
}