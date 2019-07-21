import React, { useState } from 'react';
import styled from 'styled-components'

import MainMenuScreen from './components/screens/MainMenuScreen'
import GameScreen from './components/screens/GameScreen'
import OptionsScreen from './components/screens/OptionsScreen'

import { GameStateProvider } from './game-state/GameStateContext'
import { AssetsProvider } from './assets/AssetsContext'

const AppWrapper = styled.div`
  text-align: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`

function App() {
  const screens = [
    'MainMenuScreen',
    'GameScreen',
    'OptionsScreen'
  ]

  const [activeScreen, setActiveScreen] = useState(screens[0])

  const switchActiveScreen = screen => {
    setActiveScreen(screen)
  }

  const renderActiveScreen = screen => {
    switch (screen) {
      case screens[0]:
        return <MainMenuScreen onSwitchScreen={switchActiveScreen}/>
      case screens[1]:
        return <GameScreen onSwitchScreen={switchActiveScreen}/>
      case screens[2]:
        return <OptionsScreen onSwitchScreen={switchActiveScreen}/>
      default:
        return <div>Screen "{screen}" not found.</div>
    }
  }

  return (
    <AssetsProvider>  
      <GameStateProvider>
        <AppWrapper className="App">
          {renderActiveScreen(activeScreen)}
        </AppWrapper>
      </GameStateProvider>
    </AssetsProvider>
  );
}

export default App;
