import { Router } from 'express';
const router = Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send({ root: true });
});

export default router;
