const dotenv = require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rollbar = require('./logger');

// Validar arquivo .env
if (!process.env.ADMIN_EMAIL) {
  throw new Error('O arquivo .env não foi carregado corretamente');
}

// Inicializar Logger
if (process.env.ROLLBAR_TOKEN) {
  rollbar.setup(process.env.ROLLBAR_TOKEN);
  // rollbar.info("I'm alive");
  // throw new Error("Test error");
}

// Setup express
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Require routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Declare routes
app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
// The server index should be the frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
