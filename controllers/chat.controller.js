const { Chat, User } = require("../models")
const { ChatValidation } = require("../validations")

exports.createChat = async (req, res) => {
    ChatValidation(req.body, res)
    try {
        const chat = await Chat.create(req.body)
        res.status(200).json({
            success: true,
            message: "Chat created",
            chat
        })
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

exports.getChat = async (req, res) => {
    try {
        const chat = await Chat.findAll()
        res.status(200).json({
            success: true,
            message: "List of chat",
            chat
        })
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

exports.getChatById = async (req, res) => {
    try {
        const chat = await Chat.findByPk(req.params.id, {
            include: {
                model: User,
                as: "user"
            }
        })
        if (!chat) {
            return res.status(200).json({
                success: true,
                message: "Chat not found",
            })
        }
        res.status(200).json({
            success: true,
            message: "details of chat",
            chat
        })
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

exports.updateChat = async (req, res) => {
    ChatValidation(req.body, res)
    try {
        const chat = await Chat.findByPk(req.params.id)
        if (!chat) {
            return res.status(200).json({
                success: true,
                message: "Chat not found",
            })
        }
        await chat.update(req.body)
        res.status(200).json({
            success: true,
            message: "chat updated",
            chat
        })
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}


exports.deleteChat = async (req, res) => {
    try {
        const chat = await Chat.findByPk(req.params.id)
        if (!chat) {
            return res.status(200).json({
                success: true,
                message: "Chat not found",
            })
        }
        await chat.destroy()
        res.status(200).json({
            success: true,
            message: "chat deleted",
        })
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}