import indexRouter from '../routes/indexRouter';
import usersRouter from '../routes/userRouter';
import authRouter from '../routes/authRouter';

/**
 * Configura rotas do app
 * @param {Express} app
 */
export default function(app) {
  app.use('/api', indexRouter);
  app.use('/api/users', authRouter);
  app.use('/api/users', usersRouter);
}
