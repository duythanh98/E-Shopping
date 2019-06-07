var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller')

// router.get('/', controller.index);

router.get('/add', controller.add)

router.post('/add', controller.postCreate)

module.exports = router;
