import jwt from 'jsonwebtoken'
import { ENV } from './ENV.js'

export const generateToken = (res, userId) => {
    const { JWT_SECRET } = ENV
    if (!JWT_SECRET){
        throw new Error(`JWT_SECRET is undefined.`)
    }
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("Token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    })

    return token
}