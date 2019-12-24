import express from 'express';
import { withAuth, withRole } from '../middlewares';
import { ROLES } from '../settings';
import {
  store,
  index,
  findById,
  update,
  destroy
} from '../controllers/userController';

const router = express.Router();

router
  .route('/')
  .post(withRole(ROLES.ADMIN), store)
  .get(withRole(ROLES.ADMIN), index);

router
  .route('/:id')
  .get(withRole(ROLES.ADMIN), findById)
  .put(withRole(ROLES.ADMIN), update)
  .delete(withRole(ROLES.ADMIN), destroy);

export default router;
