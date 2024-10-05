const { Admin } = require("../models");
const { generateToken } = require("../tokens");
const { AdminValidation } = require("../validations");
const bcrypt = require("bcrypt")

exports.createAdmin = async (req,res)=>{
    AdminValidation(req.body,res)
    try{
        const admin = await Admin.create(req.body)
        res.status(200).json({
            success: true,
            message: "admin created",
            admin
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

exports.loginAdmin = async (req,res)=>{
    AdminValidation(req.body,res)
    try{
        const {username,password} = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Username or password is invalid",
            });
        }
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Username or password is invalid",
            });
        }
        const token = generateToken(admin,process.env.ADMIN_JWT_SECRET)
        return res.json({
            success: true,
            message: "Token",
            token: token,
        });
    }
    catch(e){
        res.status(500).send(e.message)
    }
}

exports.getAdmin = async (req,res)=>{
    try{
        const admin = await Admin.findAll()
        res.status(200).json({
            success: true,
            message: "List of admin",
            admin
        })
    }
    catch(e){
        res.status(500).send(e.message)
    }
}

exports.getAdminById = async (req,res)=>{
    try{
        const admin = await Admin.findByPk(req.params.id)
        if(!admin){
            res.status(404).json({
                success: false,
                message: "Admin not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Details of admin",
            admin
        })
    }
    catch(e){
        res.status(500).send(e.message)
    }
}


exports.updateAdmin = async (req,res)=>{
    AdminValidation(req.body,res)
    try{
        const admin = await Admin.findByPk(req.params.id)
        if(!admin){
            res.status(404).json({
                success: false,
                message: "Admin not found"
            })
        }
        await admin.update(req.body)
        res.status(200).json({
            success: true,
            message: "Admin updated",
            admin
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

exports.deleteAdmin = async (req,res)=>{
    try{
        const admin = await Admin.findByPk(req.params.id)
        if(!admin){
            res.status(404).json({
                success: false,
                message: "Admin not found"
            })
        }
        await admin.destroy()
        res.status(200).json({
            success: true,
            message: "Admin deleted",
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
}