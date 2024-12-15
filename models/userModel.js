const { DataTypes } = require("sequelize")

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
    age: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
}, {
})


module.exports = User