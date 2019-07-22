import React, { useState } from 'react';
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'
import { GameStateProvider } from './game-state/GameStateContext'
import useGameState from './game-state/useGameState'
import { AssetsProvider } from './assets/AssetsContext'
import MainMenuScreen from './components/screens/MainMenuScreen'
import GameScreen from './components/screens/GameScreen'
import OptionsScreen from './components/screens/OptionsScreen'


const AppWrapper = styled.div`
  text-align: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  background-color: ${props => props.theme.primaryBackgroundColor};
`

function App() {
  const { theme } = useGameState()

  const switchActiveScreen = screen => {
    setActiveScreen(screen)
  }
  
  const rawScreens = {
    'MainMenuScreen': <MainMenuScreen onSwitchScreen={switchActiveScreen}/>,
    'GameScreen': <GameScreen onSwitchScreen={switchActiveScreen}/>,
    'OptionsScreen': <OptionsScreen onSwitchScreen={switchActiveScreen}/>
  }

  const [activeScreen, setActiveScreen] = useState('MainMenuScreen')
  
  const screenItems = Object.keys(rawScreens)
  console.log(screenItems)
  const screens = useTransition(activeScreen, item => {console.log(item[0]);return item[0]}, {
    from: {transform: 'translate3d(100%, 0px, 0px)' },
    enter: {transform: 'translate3d(0%, 0px, 0px)' },
    leave: {transform: 'translate3d(-100%, 0px, 0px)' }
  })

  const renderActiveScreen = screen => {
    // return screens[screen] || <div>Screen {screen} is not defined.</div>
    return screens.map(({ item, key, props }) => {
      return (
        <animated.div key={key} style={{...props, position: 'absolute', height: '100%', width: '100%'}}>
          {rawScreens[item]}
        </animated.div>
      )
    })
  }

  return (
    <AssetsProvider>  
      <GameStateProvider>
        <AppWrapper className="App" theme={theme}>
          {renderActiveScreen(activeScreen)}
        </AppWrapper>
      </GameStateProvider>
    </AssetsProvider>
  );
}

export default App;
