const express = require("express")
const sequelize = require("./config/database")
const path = require("path")
const cors = require("cors")

require("dotenv").config()

const app = express()

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())

const user = require("./routes/user.route")
app.use("/api",user)


const PORT = process.env.PORT || 7777


sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    })
})
