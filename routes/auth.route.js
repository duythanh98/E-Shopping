var express = require('express');
var router = express.Router();
var authController = require("../controllers/auth.controller");
var authMiddleware = require('../middlewares/auth');

//GET
router.get('/payment',authMiddleware,authController.payment);
router.get('/register',authController.register);
router.get('/is-available', authController.isAvailable);
router.get("/login", authController.login);
router.get('/profile',authMiddleware,authController.profile);

//POST
router.post('/register',authController.postRegister);
router.post("/login",authController.postLogin);
router.post('/logout',authMiddleware,authController.logout);
module.exports = router;