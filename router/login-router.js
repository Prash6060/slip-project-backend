// auth-router.js
const express = require('express');
const router = express.Router();
const authcontrollers = require("../controller/login-controller"); 

router.post("/login",authcontrollers.login)

module.exports = router;
