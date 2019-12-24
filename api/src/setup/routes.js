import indexRouter from '../routes/index';
import usersRouter from '../routes/users';
import authRouter from '../routes/auth';

/**
 * @param app
 */
export default function(app) {
  app.use('/api', indexRouter);
  app.use('/api/users', authRouter);
  app.use('/api/users', usersRouter);
}
