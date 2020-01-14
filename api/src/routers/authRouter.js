// Auth Router

import express from 'express';
import { withAuth } from '../middlewares';
import { ROLES } from '../settings';
import { User } from '../models';
import { jwtSign, encryptCompare } from '../utils';
const { JWT_SECRET = 'c4all' } = process.env;

const authRouter = express.Router();

authRouter.post(
  '/signup',
  async ({ body: { email = '', password = '', ...body } }, res) => {
    const user = await User.create({ ...body, email, password, role: ROLES.USER });
    const token = await jwtSign(user.toJSON(), JWT_SECRET);

    res.send({
      user: { email, role: user.role },
      token
    });
  }
);

authRouter.post('/login', async ({ body: { email = '', password = '' } }, res) => {
  const user = await User.findOne({ where: { email: email } });
  if (!user || !encryptCompare(password, user.password))
    return res.status(401).send({ error: 'Login inválido' });

  const token = await jwtSign(user.toJSON(), JWT_SECRET);

  res.send({
    user: { email, role: user.role },
    token
  });
});

authRouter.get('/whoami', withAuth(), ({ auth: { email, role } }, res) =>
  res.send({
    user: { email, role }
  })
);

export default authRouter;
