const Blog = require("../models/blogModel");

const createBlog = async (req, res) => {
    try {
        const {blogTitle,blogDescription,createdBy}  = req.body
        const [blog,created] = await Blog.findOrCreate({
            where: {
            blogTitle
            },
            defaults: {
                blogDescription,createdBy
            }
        })
        if (!created) {
            res.status(400).json({
                status: "fail",
                message: "The blog with the given title already exist"
            })
        }
        if (created) {
            res.status(200).json({
                status: "success",
                data:blog
            })
        }
    } catch (error) {
        
    }
}


module.exports = {createBlog}