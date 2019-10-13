import React, { useState } from 'react';
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'
import { GameStateProvider } from 'game-state/GameStateContext'
import { FlagsProvider } from 'flags/FlagsContext'
import { AssetsProvider } from 'assets/AssetsContext'
import { SoundProvider } from 'sound-manager/SoundContext'
import useAssets from 'assets/useAssets'
import useGameState from 'game-state/useGameState'
import MainMenuScreen from 'screens/MainMenuScreen'
import GameScreen from 'screens/GameScreen'
import OptionsScreen from 'screens/OptionsScreen'
import LoadingScreen from 'screens/LoadingScreen'

const AppWrapperStyles = styled.div`
  text-align: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  font-family: ${({ ui }) => ui};
  @import url('https://fonts.googleapis.com/css?family=${({ ui }) => ui}|${({ wordDisplay }) => wordDisplay}|${({ titleDisplay }) => titleDisplay}&display=swap');
`

const AppWrapper = ({ children }) => {
  const {
    fonts
  } = useGameState()

  return (
    <AppWrapperStyles { ...fonts }>
      { children }
    </AppWrapperStyles>
  )
}

function App() {
  const [ loading, setLoading ] = useState(true)

  const { onReady } = useAssets()

  const handleSwitchScreen = screen => {
    setActiveScreen(screen)
  }
  
  const screens = {
    'MainMenuScreen': <MainMenuScreen onSwitchScreen={handleSwitchScreen}/>,
    'GameScreen': <GameScreen onSwitchScreen={handleSwitchScreen}/>,
    'OptionsScreen': <OptionsScreen onSwitchScreen={handleSwitchScreen}/>,
    'LoadingScreen': <LoadingScreen onSwitchScreen={handleSwitchScreen}/>
  }

  const [activeScreen, setActiveScreen] = useState('LoadingScreen')

  // Allows other screens to "slide out" from the main menu, and
  // "slide back" when returning to the main menu, which is better
  // UX than the screen transitions all sliding in one direction.
  const springTransitions = activeScreen !== 'MainMenuScreen'
    ? {
        from: {transform: 'translate3d(100%, 0px, 0px)' },
        enter: {transform: 'translate3d(0%, 0px, 0px)' },
        leave: {transform: 'translate3d(-100%, 0px, 0px)' }
      }
    : {
        from: {transform: 'translate3d(-100%, 0px, 0px)' },
        enter: {transform: 'translate3d(0%, 0px, 0px)' },
        leave: {transform: 'translate3d(100%, 0px, 0px)' }
      }
  
  const screenTransitions = useTransition(activeScreen, item => item, springTransitions)

  const renderActiveScreen = () => {
    return screenTransitions.map(({ item, key, props }) => {
      return (
        <animated.div key={key} style={{...props, position: 'absolute', height: '100%', width: '100%'}}>
          {screens[item]}
        </animated.div>
      )
    })
  }

  if (loading) {
    onReady(() => {
      setLoading(false)
    })
  }

  return (
    <FlagsProvider>
      <AssetsProvider> 
        <SoundProvider>
          <GameStateProvider>
            <AppWrapper className="App">
              {renderActiveScreen()}
            </AppWrapper>
          </GameStateProvider>
        </SoundProvider>
      </AssetsProvider>
    </FlagsProvider>
  );
}

export default App;
