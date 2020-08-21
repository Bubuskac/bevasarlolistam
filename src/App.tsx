import React, { FunctionComponent } from 'react';
import Login from './Login';
import './App.css';

const App: FunctionComponent<{}> = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Bevásárlólistám
        </h1>
      </header>
      <Login />
    </div>
  );
}

export default App;
