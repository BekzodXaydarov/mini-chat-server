const Joi = require("joi");

const UserSchema = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
    photo: Joi.string().required(),
})

module.exports = { UserSchema }