const sequalize = require("./dbConnect")
const User = require("../models/userModel")

const modelsSync = async () => {
try {
    
   await User.sync({alter:true})
   console.log("User model is altered");
   
} catch (error) {
    console.log(error.message);
    
}    
}

module.exports = modelsSync