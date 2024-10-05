const jwt = require("jsonwebtoken");

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

const UserToken = (req, res, next) => {  
  const token = req?.headers["token"];

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.USER_JWT_SECRET, (err) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token!" });
    }
    next();
  });
};

const generateToken = (data, secretKey) => {
  return jwt.sign({ id: data.id, name: data.name }, secretKey, {
    expiresIn: "24h",
  });
};

module.exports = { adminToken,UserToken, generateToken };
