// Auth Router

const express = require('express');
const { withAuth, withRole } = require('../middlewares');
const { ROLES } = require('../settings');

const authRouter = express.Router();

const { User } = require('../models');
const { jwtSign, encryptCompare } = require('../utils');
const { JWT_SECRET = 'c4all' } = process.env;

authRouter.post('/signup', async function({ body: { email = '', password = '', ...body } }, res) {
  const user = await User.create({ ...body, email, password, role: ROLES.USER });
  const token = await jwtSign(user.toJSON(), JWT_SECRET);

  res.send({
    user: { email, role: user.role },
    token
  });
});

authRouter.post('/login', async function login({ body: { email = '', password = '' } }, res) {
  const user = await User.findOne({ where: { email: email } });
  if (!user || !encryptCompare(password, user.password)) return res.status(401).send({ error: 'Login inválido' });

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

module.exports = authRouter;
