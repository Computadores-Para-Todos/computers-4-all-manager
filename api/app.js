const express = require('express');
require('express-async-errors');
const dotenv = require('dotenv').config();
const rollbar = require('./logger');
const routes = require('./src/setup/routes');
const expressConfig = require('./src/setup/expressConfig');
const error = require('./src/setup/error');

const { ADMIN_EMAIL, DB_HOST, DB_USERNAME, DATABASE } = process.env;

// Validar arquivo .env
if (!ADMIN_EMAIL || !DB_HOST || !DB_USERNAME || !DATABASE) {
  throw new Error(
    'O arquivo .env não foi carregado corretamente. Leia o README para mais informações.'
  );
}

// Inicializar Logger
if (process.env.ROLLBAR_TOKEN) {
  rollbar.setup(process.env.ROLLBAR_TOKEN);
  // rollbar.info("I'm alive");
  // throw new Error("Test error");
}

// Start express app
const app = express();

// Setup
expressConfig(app);
routes(app);
error(app);

// Starting database
require('./src/models');

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

module.exports = app;
