const sequlaize  =require("./cofig/dbConnect")
const express  = require("express")
const app = express()
const User = require("./models/userModel")
const modelsSync = require("./cofig/syncModels")
const userRoutes = require("./routes/userRoutes")


modelsSync()
app.use(express.json())

// User.sync({ force: true });
const port = 3000



app.use("/api/v1/users",userRoutes)
app.listen(port, () => {
    console.log("The server is listening on port " + port );
    
})