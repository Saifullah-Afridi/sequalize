const express = require("express")
const { getAllPosts, createPost, getSinglePost, updatePost, deletePost } = require("../controllers/postController")
const router = express.Router()

router.get("/", getAllPosts)
router.post("/", createPost)
router.get("/:postId", getSinglePost)
router.patch("/:postId", updatePost)
router.delete("/:postId",deletePost)


module.exports = router