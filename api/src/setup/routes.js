const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');

module.exports = function(app) {
  app.use('/api', indexRouter);
  app.use('/api/users', usersRouter);
}