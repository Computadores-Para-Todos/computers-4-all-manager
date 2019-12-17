import React, { useEffect } from 'react';
import logger from './logger';
import 'semantic-ui-css/semantic.css';
import Autenticacao from './components/Autenticacao/Autenticacao';

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

  const callbackOk = () => {
    console.log('status: 200');
  };
  const callbackNotOk = () => {
    console.log('status: 400');
  };
  const apiUrl = 'https://api.pc4all.com';

  return <Autenticacao apiUrl={apiUrl} callbackOk={callbackOk} callbackNotOk={callbackNotOk} />;
}

export default App;
