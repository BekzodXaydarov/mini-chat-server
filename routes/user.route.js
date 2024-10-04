const { Router } = require("express")
const router = Router();

const UserController = require("../controllers/user.controller")
const upload = require("../config/multer")

router.post("/user",upload.single("photo"),UserController.createUser)
router.get("/user",UserController.getUser)
router.get("/user/:id",UserController.getUserById)
router.put("/user/:id",upload.single("photo"),UserController.updateUser)
router.delete("/user/:id",UserController.deleteUser)
router.post("/userLogin",UserController.loginUser)

module.exports = router