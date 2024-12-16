const { DataTypes } = require("sequelize")
const bcrypt = require("bcrypt")
const sequalize = require("../cofig/dbConnect")

const User = sequalize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        unique:true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue:"user"
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    passwordConfirm: {
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    hooks: {
        beforeCreate: async (user)=>{
            if (user.password) {
                const salt =  bcrypt.genSaltSync(5)
                user.password =  bcrypt.hashSync(user.password,salt)
            }
        }
    }
})


module.exports = User