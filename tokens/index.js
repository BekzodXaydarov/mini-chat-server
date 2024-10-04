const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["token"];

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token!" });
    }
    next();
  });
};

const generateToken = (data) => {
  return jwt.sign({ id: data.id, name: data.name }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = { verifyToken,generateToken };
