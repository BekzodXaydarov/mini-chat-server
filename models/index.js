const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user.model")(sequelize, Sequelize);
const Admin = require("./admin.model")(sequelize, Sequelize);

module.exports = { User, Admin };
