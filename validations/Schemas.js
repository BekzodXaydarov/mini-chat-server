const Joi = require("joi");

const UserSchema = Joi.object({
  username: Joi.string().required(),
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  photo: Joi.string().required(),
});

const UserLoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const AdminSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { UserSchema, UserLoginSchema, AdminSchema };
