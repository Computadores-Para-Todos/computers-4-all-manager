const dotenv = require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rollbar = require('./logger');

// Validar dotenv
if (dotenv.error) {
  throw result.error;
}
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

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
