const express = require("express");
const { createUser, getUserById, updateUser, getAllUsers, updateUsingReqBodyData } = require("../controllers/userControllers");

const router = express.Router()
router.post("/test",updateUsingReqBodyData)
router.get('/',getAllUsers)
router.post("/", createUser);
router.get("/:id",getUserById)
router.patch("/:id",updateUser)

module.exports = router