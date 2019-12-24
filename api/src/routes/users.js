const express = require('express');
const { withAuth, withRole } = require('../middlewares');
const { ROLES } = require('../settings');

const router = express.Router();

const {
  store,
  index,
  findById,
  update,
  destroy
} = require('../controllers/userController');

router
  .route('/')
  .post(withRole(ROLES.ADMIN), store)
  .get(withRole(ROLES.ADMIN), index);

router
  .route('/:id')
  .get(withRole(ROLES.ADMIN), findById)
  .put(withRole(ROLES.ADMIN), update)
  .delete(withRole(ROLES.ADMIN), destroy);

module.exports = router;
