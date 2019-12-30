/**
 * @typedef {import('express').Express} Express
 */
import logger from '../logger';
import createError from 'http-errors';

/**
 * Adiciona handlers de erro ao App
 * @param {Express} app Express
 * @returns {void}
 */
export default function errorSetup(app) {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req, res, next) => {
    console.error(err);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Send error to rollbar when not on dev
    if (req.app.get('env') !== 'development') {
      logger.error(err);
    }

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
  });
}
