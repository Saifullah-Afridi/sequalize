const { DataTypes } = require("sequelize")
const sequalize = require("../cofig/dbConnect")

const Blog =  sequalize.define("Blog", {
    blogId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique:true
    },
    blogTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    blogDescription: {
        type: DataTypes.STRING,
        allowNull:false
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})



module.exports =Blog