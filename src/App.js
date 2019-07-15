import React, { useState } from 'react';
import './App.css';

import GameScreen from './components/screens/GameScreen'

import config from './config'

function App() {

  return (
    <div className="App">
      <GameScreen></GameScreen>
    </div>
  );
}

export default App;
