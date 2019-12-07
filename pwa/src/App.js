import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import logger from './logger';

console.log(".env", process.env);

function App() {

    useEffect(() => {
        // Setup logging with Rollbar
        if (process.env.REACT_APP_ROLLBAR_TOKEN) {
            logger.setup(process.env.REACT_APP_ROLLBAR_TOKEN);
            // logger.info("I'm alive");
            // throw new Error("Test error");
        }
    });



    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
