import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import logger from './logger';
import 'semantic-ui-css/semantic.css';
import Authentication from './components/Authentication';

console.log('.env', process.env);

/**
 * Main App call
 * @returns {React} App rendered
 */
function App() {
  useEffect(() => {
    // Setup logging with Rollbar
    if (process.env.REACT_APP_ROLLBAR_TOKEN) {
      logger.setup(process.env.REACT_APP_ROLLBAR_TOKEN);
      // logger.info("I'm alive");
      // throw new Error("Test error");
    }
  });

  const apiUrl = 'http://localhost:3001/api';

  return (
    <BrowserRouter>
      <Authentication apiUrl={apiUrl} />
    </BrowserRouter>
  );
}

export default App;
