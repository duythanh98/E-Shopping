var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index.controller');

router.get('/',indexController.home);
router.get('/page/:page',indexController.page);
router.post('/search',indexController.search);
module.exports = router;