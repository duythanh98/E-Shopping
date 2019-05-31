var express = require('express');
var router = express.Router();
var controller = require('../controllers/product.controller');

router.get('/', controller.index);
router.get('/detail',controller.detail);
router.get('/archive', controller.archive);
router.get('/cart',controller.cart);
module.exports = router;