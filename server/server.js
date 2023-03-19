require('dotenv').config()
const express = require('express')
const app = express();

const sequelize = require("./db")

const cors = require('cors')
app.use(cors({origin: "http://localhost:3000"}));

const PORT = process.env.PORT
const WEBSITE = process.env.WEBSITEPORT
const models = require('./models/models')
const routers = require('./routers/index')
const ErrorMid= require("./middlware/middlware")
app.use(express.json())
app.use("/api", routers)



app.use(ErrorMid)
const start = async () =>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, (error) => {
            error ? console.log(error) : console.log(`listen ${PORT} port`)
        })
    } catch (e) {
        console.log(e);
    }
}

start()


