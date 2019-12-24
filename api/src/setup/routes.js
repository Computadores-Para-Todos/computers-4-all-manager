const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');
const authRouter = require('../routes/auth');

module.exports = function(app) {
  app.use('/api', indexRouter);
  app.use('/api/users', authRouter);
  app.use('/api/users', usersRouter);
};
