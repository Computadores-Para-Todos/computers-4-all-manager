const express = require('express');
const { withAuth, withRole } = require('../middlewares');
const { ROLES } = require('../settings');

const router = express.Router();

const UserController = require('../controllers/userController');

router
  .route('/')
  .post(withRole(ROLES.ADMIN), UserController.store)
  .get(withRole(ROLES.ADMIN), UserController.index);

router
  .route('/:id')
  .get(withRole(ROLES.ADMIN), UserController.findById)
  .put(withRole(ROLES.ADMIN), UserController.update)
  .delete(withRole(ROLES.ADMIN), UserController.delete);

module.exports = router;
