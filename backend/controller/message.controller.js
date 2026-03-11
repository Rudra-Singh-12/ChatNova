import Message from "../model/message.model.js"
import User from "../model/user.model.js"
import cloudinary from "../utils/cloudinary.js"

export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({
            _id: { $ne: loggedInUserId }
        }).select("-password")

        return res.status(200).json(filteredUsers)
    } catch (err) {
        console.log("Error in getAllContacts: ", err)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}
export const getMessageByUserId = async (req, res) => {
    try {
        const myId = req.user._id
        const { id: userToChatId } = req.params
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })

        res.status(200).json(messages)

    } catch (error) {
        console.log("Error in the GetMessage Controller:", error.message)
        res.status(500).json({ error: "Internal server error." })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let imageUrl

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image,
        })

        await newMessage.save()

        // todo: send message
        res.status(200).json(newMessage)


    } catch (error) {
        console.log("Error in the sendMessage controller: ", error.message)
        res.status(500).json({ error: "Internal Server Error." })
    }
}

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id.toString();

        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ]
        });

        const chatPartnerIds = [
            ...new Set(
                messages.map(msg =>
                    msg.senderId.toString() === loggedInUserId
                        ? msg.receiverId.toString()
                        : msg.senderId.toString()
                )
            )
        ];

        const chatPartners = await User.find({
            _id: { $in: chatPartnerIds }
        }).select("-password");

        res.status(200).json(chatPartners);

    } catch (error) {
        console.log("Error in getChatPartners:", error.message);
        res.status(500).json({ error: "Internal Server error." });
    }
};