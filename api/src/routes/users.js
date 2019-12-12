var express = require('express');
var router = express.Router();

const UserController = require('../controllers/userController');

router.post('/users', UserController.store);
router.get('/users/', UserController.index);

module.exports = router;
