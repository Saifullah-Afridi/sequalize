const Post = require("../models/postModel");
const User = require("../models/userModel");

const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body)
        res.status(200).json({
            status: "success",
            data: post
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error
        })
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({include:User})
        if (!posts) {
            return res.status(404).json({
                status: "fail",
                message: "No post has been found"
            })
        }
        res.status(200).json({
            status: "success",
            totalPosts:posts.length,
            data: posts
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error
        })
    }
}

const getSinglePost = async (req, res) => {
    try {
        const { postId } = req.params
        const post = await Post.findByPk(postId, {
            include: [
                {
                    model: User,
                    attributes:["name","email"]
            }
        ]})
        if (!post) {
            return res.status(404).json({status:"fail",message:"No post with the given id"})
        }
        res.status(200).json({status:"success",data:post})
    } catch (error) {
            console.log(error)

        res.status(500).json({
            
            status: "fail",
            message: error
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.postId)
        if (!post) {
            return res.status(404).json({
                status: "fail", message: "No post with the given id"
            })
        }
        post.update(req.body)
        post = await Post.save()
        res.status(200).json({
            status: "success",
            data: post
        })
    }
     catch (error) {
        res.status(500).json({
            status: "error",
            message: error
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.postId)
        if (!post) { 
            return res.status(404).json({
                status: "fail",
                message: "No post with the given id"
            })
        }
        await post.destroy()
        res.status(200).json({
            status: "success",
            message: "Post deleted successfully"
        })
    } catch (error) {
         res.status(500).json({
            status: "error",
            message: error
        })
    }
}

module.exports = {
    createPost,getAllPosts,getSinglePost,updatePost,deletePost
}