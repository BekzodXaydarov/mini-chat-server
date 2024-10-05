module.exports = (sequelize,DataTypes)=>{
    const Chat = sequelize.define("Chat",{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "id"
            }
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    Chat.associate = (models)=>{
        Chat.belongsTo(models.User,{
            foreignKey: "user_id",
            as: "user"
        })
    }

    return Chat
}