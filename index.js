const express = require("express")
const sequelize = require("./config/database")

require("dotenv").config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 7777


sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    })
})
