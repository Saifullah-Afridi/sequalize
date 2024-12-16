const express = require("express")
const { createBlog } = require("../controllers/blogControllers")
const router = express.Router()

router.post("/",createBlog)

module.exports = router