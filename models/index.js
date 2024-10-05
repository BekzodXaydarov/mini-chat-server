const { Sequelize, CHAR } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user.model")(sequelize, Sequelize);
const Admin = require("./admin.model")(sequelize, Sequelize);
const Chat = require("./chat.model")(sequelize,Sequelize)

User.associate(sequelize.models)
Chat.associate(sequelize.models)

module.exports = { User, Admin,Chat };
