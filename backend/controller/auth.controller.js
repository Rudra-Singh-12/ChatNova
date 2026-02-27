import User from "../model/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/genToken.js";
import { sendWelcomeEmail } from "../Email/emailHandler.js";
import { ENV } from "../utils/ENV.js";
import cloudinary from "../utils/cloudinary.js";


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
            const token = generateToken(res, user._id)


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

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(400)
                .json({
                    Message: "Invalid Credentials."
                })
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) {
            return res.status(400)
                .json({
                    Message: "Invalid Credentials."
                })
        }
        generateToken(res, existingUser._id)
        res.status(200).json({
            _id: existingUser._id,
            fullName: existingUser.fullName,
            email: existingUser.email,
            profilePic: existingUser.profilePic,
        })
    } catch (error) {
        console.error("Error in the Login Controller.")
        return res.status(500)
            .json({
                message: "Internal Server Error."
            })
    }
}

export const logout = (_, res) => {
    res.cookie("token", "", { maxAge: 0 })
    res.status(200).json({
        Message: "Logged out successfully."
    })
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body
        if (!profilePic) {
            return res.status(400)
                .json({
                    message: "Profile pic is required"
                })
        }

        const userId = req.user._id
        const uploadResponse = await cloudinary.uploader(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })

        return res.status(200).json({
            message: "Profile is updated",
            updatedUser
        })
    } catch (error) {
        return res.status(500)
            .json({
                message: "Internal Server Error."
            })
    }
}