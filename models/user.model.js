const bcrypt = require("bcrypt")
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })

    User.beforeSave(async (user) => {
        if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10)
        }
    })

    User.associate = (models)=>{
        User.hasMany(models.Chat,{
            foreignKey: "user_id",
            as: "chats"
        })
    }

    return User
}