const { Router } = require("express");
const router = Router();

const AdminController = require("../controllers/admin.controller");
const { adminToken } = require("../tokens");

router.post("/admin", AdminController.createAdmin);
router.post("/adminlogin",AdminController.loginAdmin)
router.get("/admin",adminToken,AdminController.getAdmin)
router.get("/admin/:id",adminToken,AdminController.getAdminById)
router.put("/admin/:id",adminToken,AdminController.updateAdmin)
router.delete("/admin/:id",adminToken,AdminController.deleteAdmin)

module.exports = router;
