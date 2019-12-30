/**
 * @typedef {import('express').Express} Express
 */
import indexRouter from './indexRouter';
import userRouter from './userRouter';
import authRouter from './authRouter';
import statusRouter from './statusRouter';

/**
 * Configura rotas do app
 * @param {Express} app Express
 * @returns {void}
 */
export function setupRouters(app) {
  app.use('/api', indexRouter);
  app.use('/api/users', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/statuses', statusRouter);
}

export { indexRouter, userRouter, authRouter, statusRouter };
