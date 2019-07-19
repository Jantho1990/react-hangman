import React, { useState } from 'react';
import styled from 'styled-components'
// import './App.css';

import MainMenuScreen from './components/screens/MainMenuScreen'
import GameScreen from './components/screens/GameScreen'
import OptionsScreen from './components/screens/OptionsScreen'

// import DataStore, { DataConsumer } from './DataStore'
import { GameStateProvider } from './components/game-state/GameStateContext'
import { AssetsProvider } from './assets/AssetsContext'
import useGameState from './components/game-state/useGameState'

import config from './config'
// import themes from './themes'

const theme = useGameState.theme
console.log(theme)

const AppWrapper = styled.div`
  text-align: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  ${'' /* background-color: ${theme.primaryBackgroundColor};
  color: ${theme.primaryFontColor}; */}
`

function App() {
  const screens = [
    'MainMenuScreen',
    'GameScreen',
    'OptionsScreen'
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
