var express = require('express');
var router = express.Router();
var authController = require("../controllers/auth.controller");


router.get('/payment',authController.payment);
router.get('/register',authController.register);
router.post('/register',authController.postRegister);
router.get('/is-available', authController.isAvailable);
router.get("/login", authController.login);
router.post("/login",authController.postLogin);
module.exports = router;