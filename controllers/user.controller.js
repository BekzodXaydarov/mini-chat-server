const { User } = require("../models");
const { generateToken } = require("../tokens");
const { UserValidation, UserLoginValidation } = require("../validations");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const imgUrl = `/uploads/${req.file.filename}`;
  UserValidation({ ...req.body, photo: imgUrl }, res);
  try {
    const user = await User.create({ ...req.body, photo: imgUrl });
    res.status(200).json({
      success: true,
      message: "user created",
      user,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json({
      success: true,
      message: "list of user",
      user,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "details of user",
      user,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
exports.updateUser = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const imgUrl = `/uploads/${req.file.filename}`;
  UserValidation({ ...req.body, photo: imgUrl }, res);
  UserValidation(req.body, res);
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    await user.update({ ...req.body, photo: imgUrl });
    res.status(200).json({
      success: true,
      message: "user updated",
      user,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    await user.destroy();
    res.status(200).json({
      success: true,
      message: "user deleted",
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.loginUser = async (req, res) => {
  UserLoginValidation(req.body, res);
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Username or password is invalid",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Username or password is invalid",
      });
    }
    const token = generateToken(user, process.env.USER_JWT_SECRET);
    return res.json({
      success: true,
      message: "Token",
      token: token,
      user: req.user,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
