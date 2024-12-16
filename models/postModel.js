const {DataTypes }  = require("sequelize")
const sequalize = require("../cofig/dbConnect")

const Post = sequalize.define("Post", {
    postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique:true
    },
    
    postContent: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
})

module.exports = Post