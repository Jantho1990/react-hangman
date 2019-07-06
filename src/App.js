import React from 'react';
import logo from './logo.svg';
import './App.css';

import LetterSelector from './components/LetterSelector'
import WordDisplay from './components/WordDisplay'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload your stuff.
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
      <WordDisplay word="fishsticks"/>
      <LetterSelector/>
    </div>
  );
}

export default App;
