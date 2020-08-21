import React, { FunctionComponent } from 'react';
import Login from './Login';
import List from './List';
import './App.css';

const App: FunctionComponent<{}> = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Bevásárlólistám
        </h1>
      </header>
      {false ? <Login /> : <List />}
    </div>
  );
}

export default App;
