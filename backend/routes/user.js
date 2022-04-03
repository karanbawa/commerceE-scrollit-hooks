const express = require("express");

const UserController = require("../controllers/user");

const router = express.Router();

router.post("/post-jwt-register", UserController.createUser);

router.post("/post-jwt-login", UserController.userLogin);

module.exports = router;
