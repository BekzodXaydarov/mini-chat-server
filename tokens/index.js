const jwt = require("jsonwebtoken");
const { User } = require("../models");

const adminToken = (req, res, next) => {  
  const token = req?.headers["token"];

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.ADMIN_JWT_SECRET, (err) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token!" });
    }
    next();
  });
};

const UserToken = async (req, res, next) => {  
  const token = req?.headers["token"];

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

 let decoded = jwt.verify(token, process.env.USER_JWT_SECRET, (err) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token!" });
    }
    next();
  });
  const user = await User.findByPk(decoded.id)
  if(!user){
    return res.status(404).json({message: "User not found"})
  }
  req.user = user
};

const generateToken = (data, secretKey) => {
  return jwt.sign({ id: data.id, name: data.name }, secretKey, {
    expiresIn: "24h",
  });
};

module.exports = { adminToken,UserToken, generateToken };
