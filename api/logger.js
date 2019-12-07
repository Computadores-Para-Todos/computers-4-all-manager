const Rollbar = require('rollbar');

// Inicializar Rollbar sem configurações
const rollbar = new Rollbar({});

const logger = {
  // Configurar rollbar
  setup: accessToken => {
    rollbar.configure({
      accessToken: accessToken,
      captureUncaught: true,
      captureUnhandledRejections: true
    });
  },
  log: (value, extra) => {
    rollbar.log(value, extra);
  },
  info: (value, extra) => {
    rollbar.info(value, extra);
  },
  critical: (value, extra) => {
    rollbar.critical(value, extra);
  },
  error: (value, extra) => {
    rollbar.error(value, extra);
  }
};

module.exports = logger;
