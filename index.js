const sequlaize  =require("./cofig/dbConnect")
const express  = require("express")
const app = express()
const User = require("./models/userModel")
const Blog = require("./models/blogModel")
const userRoutes = require("./routes/userRoutes")
const blogRoutes = require("./routes/blogRoutes")
const postRoutes = require("./routes/postRoutes")
const Post = require("./models/postModel")

sequlaize.sync({ alter: true }).then(() => {
    console.log("Tables are altered");
    
}).catch(error => {
    console.log(error);
    
})
User.hasMany(Blog, {
    foreignKey: "createdBy",
    onDelete: 'CASCADE',
});
Blog.belongsTo(User,{
    foreignKey: "createdBy",
    onDelete: 'CASCADE',
})


//post and user relations

User.hasMany(Post, {
    foreignKey: "createdBy",
    onDelete: 'CASCADE',
})

Post.belongsTo(User, {
    foreignKey: "createdBy",
    onDelete: 'CASCADE',
})




//midlewares
app.use(express.json())






//routes
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/blogs",blogRoutes)
app.use("/api/v1/posts",postRoutes)


const port = 3000
app.listen(port, () => {
    console.log("The server is listening on port " + port );
    
})