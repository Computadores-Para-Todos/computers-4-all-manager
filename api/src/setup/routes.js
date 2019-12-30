/**
 * @typedef {import('express').Express} Express
 */
import indexRouter from '../routes/indexRouter';
import usersRouter from '../routes/userRouter';
import authRouter from '../routes/authRouter';

/**
 * Configura rotas do app
 * @param {Express} app Express
 * @returns {void}
 */
export default function routesSetup(app) {
  app.use('/api', indexRouter);
  app.use('/api/users', authRouter);
  app.use('/api/users', usersRouter);
}
