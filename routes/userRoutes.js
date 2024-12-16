const express = require("express");
const { createUser, getUserById, updateUser, getAllUsers, updateUsingReqBodyData, countgreaterthenfive, login } = require("../controllers/userControllers");

const router = express.Router()
router.post("/log-in",login)
router.get("/count",countgreaterthenfive)
router.post("/test",updateUsingReqBodyData)
router.get('/',getAllUsers)
router.post("/", createUser);
router.get("/:id",getUserById)
router.patch("/:id",updateUser)

module.exports = router