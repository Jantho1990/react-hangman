import React, { useState } from 'react';
import './App.css';

import MainMenuScreen from './components/screens/MainMenuScreen'
import GameScreen from './components/screens/GameScreen'

import config from './config'

function App() {
  const screens = [
    'MainMenuScreen',
    'GameScreen'
  ]

  const [activeScreen, setActiveScreen] = useState(screens[0])

  const switchActiveScreen = screen => {
    console.log('Switching to screen', screen)
    setActiveScreen(screen)
  }

  const renderActiveScreen = screen => {
    switch (screen) {
      case screens[0]:
        return <MainMenuScreen onSwitchScreen={switchActiveScreen}/>
      case screens[1]:
        return <GameScreen onSwitchScreen={switchActiveScreen}/>
      default:
        return <div>Screen "{screen}" not found.</div>
    }
  }

  return (
    <div className="App">
      {renderActiveScreen(activeScreen)}
    </div>
  );
}

export default App;
