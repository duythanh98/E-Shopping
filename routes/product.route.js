var express = require('express');
var router = express.Router();
var controller = require('../controllers/product.controller');

// router.get('/', controller.index);
router.get('/detail/:id&:catId',controller.detail);
router.get('/archive/:catId', controller.archive);
router.get('/cart',controller.cart);
router.get('/archive/:catID/:page',controller.pageByCat);
module.exports = router;