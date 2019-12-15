var express = require('express');
var router = express.Router();

const UserController = require('../controllers/userController');

router
  .route('/')
  .post(UserController.store)
  .get(UserController.index);

router
  .route('/:id')
  .get(UserController.findById)
  .put(UserController.update)
  .delete(UserController.delete);

module.exports = router;
