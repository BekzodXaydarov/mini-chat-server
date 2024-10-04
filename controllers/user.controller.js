const { User } = require("../models")
const { UserValidation } = require("../validations")


exports.createUser = async (req,res)=>{
    UserValidation(req.body,res)
    try{
        const user = await User.create(req.body)
        res.status(200).json({
            success: true,
            message: "user created",
            user
        })
    }
    catch(e){
        res.status(500).send(e.message)
    }
}

exports.getUser = async (req,res)=>{ 
    try{
        res.status(200).send("get is successfully")
        const user = await User.findAll()
        res.status(200).json({
            success: true,
            message: "list of user",
            user
        })
    }
    catch(e){
        res.status(500).send(e.message)
    }
}
exports.getUserById = async (req,res)=>{
    try{
        const user = await User.findByPk(req.params.id)
        if(!user){
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "details of user",
            user
        })
    }
    catch(e){
        res.status(500).send(e.message)
    }
}
exports.getUser = async (req,res)=>{
    try{}
    catch(e){
        res.status(500).send(e.message)
    }
}
exports.getUser = async (req,res)=>{
    try{}
    catch(e){
        res.status(500).send(e.message)
    }
}