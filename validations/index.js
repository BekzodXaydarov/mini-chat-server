const { UserSchema, UserLoginSchema, AdminSchema, ChatSchema } = require("./Schemas");

const Validation = (schema, body, res) => {
  const { errors } = schema.validate(body);
  if (errors) {
    res.status(400).send(errors.details[0].message);
  }
};

const UserValidation = (body, res) => Validation(UserSchema, body, res);
const UserLoginValidation = (body, res) =>
  Validation(UserLoginSchema, body, res);
const AdminValidation = (body, res) => Validation(AdminSchema, body, res);
const ChatValidation = (body, res) => Validation(ChatSchema, body, res)

module.exports = { UserValidation, UserLoginValidation, AdminValidation, ChatValidation };