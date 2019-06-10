var express = require('express');
var router = express.Router();
var controller = require('../controllers/product.controller');
var authMiddleware = require("../middlewares/auth");
// router.get('/', controller.index);
router.get('/detail/:id&:catId',controller.detail);
router.get('/archive/:catId', controller.archive);
router.get('/cart',controller.cart);
router.get('/cart/add/:proID',controller.addCart);
router.get('/cart/sub/:proID',controller.subCart);
router.get('/cart/remove/:proID',controller.remove);
router.get('/archive/:catID/:page',controller.pageByCat);
router.get('/archive/:catID/filter/:type', controller.filter);
//POST
router.post('/detail/:id&:catId',authMiddleware,controller.postComment);
module.exports = router;