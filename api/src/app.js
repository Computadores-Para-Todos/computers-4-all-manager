import express from 'express';
import 'express-async-errors';
import rollbar from './logger';
import routes from './setup/routes';
import expressConfig from './setup/expressConfig';
import error from './setup/error';
import { connect } from './models';

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
connect();

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

export default app;
