/**
 * @typedef {import('express').Express} Express
 */
import userRouter from './userRouter';
import authRouter from './authRouter';
import statusRouter from './statusRouter';
import donatorRouter from './donatorRouter';

/**
 * Configura rotas do app
 * @param {Express} app Express
 * @returns {void}
 */
export function setupRouters(app) {
  app.get('/api/', (req, res) => res.send({ root: true }));
  app.use('/api/users', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/statuses', statusRouter);
  app.use('/api/donators', donatorRouter);
}

export { userRouter, authRouter, statusRouter, donatorRouter };
