const express = require('express');
const { withAuth } = require('../middlewares');

const router = express.Router();

const UserController = require('../controllers/userController');

router
  .route('/')
  .post(UserController.store)
  .get(UserController.index);

router.post('/signup', UserController.signUp);
router.get('/login', UserController.login);
router.get('/whoami', withAuth(), UserController.whoami);

router
  .route('/:id')
  .get(UserController.findById)
  .put(UserController.update)
  .delete(UserController.delete);

module.exports = router;
