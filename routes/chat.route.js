const { Router } = require("express")
const router = Router()

const ChatController = require("../controllers/chat.controller")
const { UserToken } = require("../tokens")

router.post("/chat", UserToken, ChatController.createChat)
router.get("/chat", UserToken, ChatController.getChat)
router.get("/chat/:id", UserToken, ChatController.getChatById)
router.put("/chat/:id", UserToken, ChatController.updateChat)
router.delete("/chat/:id", UserToken, ChatController.deleteChat)

module.exports = router