var express = require('express');
var router = express.Router();
var authController = require("../controllers/auth.controller");

router.get("/login", authController.login);
router.get('/payment',authController.payment);
router.get('/register',authController.register);
module.exports = router;