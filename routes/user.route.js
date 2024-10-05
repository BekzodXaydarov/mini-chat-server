const { Router } = require("express")
const router = Router();

const UserController = require("../controllers/user.controller")
const upload = require("../config/multer");
const { adminToken } = require("../tokens");

router.post("/user",adminToken,upload.single("photo"),UserController.createUser)
router.get("/user",adminToken,UserController.getUser)
router.get("/user/:id",adminToken,UserController.getUserById)
router.put("/user/:id",adminToken,upload.single("photo"),UserController.updateUser)
router.delete("/user/:id",adminToken,UserController.deleteUser)
router.post("/userLogin",UserController.loginUser)

module.exports = router