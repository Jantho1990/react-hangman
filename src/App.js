import React, { useState } from 'react';
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'
import { GameStateProvider } from './game-state/GameStateContext'
import { AssetsProvider } from './assets/AssetsContext'
import MainMenuScreen from './components/screens/MainMenuScreen'
import GameScreen from './components/screens/GameScreen'
import OptionsScreen from './components/screens/OptionsScreen'


const AppWrapper = styled.div`
  text-align: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`

function App() {
  const transitions = useTransition()
  
  const switchActiveScreen = screen => {
    setActiveScreen(screen)
  }
  
  const screens = {
    'MainMenuScreen': <MainMenuScreen onSwitchScreen={switchActiveScreen}/>,
    'GameScreen': <GameScreen onSwitchScreen={switchActiveScreen}/>,
    'OptionsScreen': <OptionsScreen onSwitchScreen={switchActiveScreen}/>
  }
  
  const [activeScreen, setActiveScreen] = useState('MainMenuScreen')

  const renderActiveScreen = screen => {
    return screens[screen] || <div>Screen {screen} is not defined.</div>
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
