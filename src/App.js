import React, { useState } from 'react';
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'
import { GameStateProvider } from './game-state/GameStateContext'
import useGameState from './game-state/useGameState'
import { AssetsProvider } from './assets/AssetsContext'
import { SoundProvider } from './sound-manager/SoundContext'
import useAssets from './assets/useAssets'
import MainMenuScreen from './components/screens/MainMenuScreen'
import GameScreen from './components/screens/GameScreen'
import OptionsScreen from './components/screens/OptionsScreen'
import LoadingScreen from './components/screens/LoadingScreen'
import useSound from './sound-manager/useSound'

const AppWrapper = styled.div`
  text-align: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  background-color: ${props => props.theme.primaryBackgroundColor};
`

function App() {
  const [ loading, setLoading ] = useState(true)

  const { theme } = useGameState()
  const { onReady } = useAssets()
  const { play, isPlaying } = useSound()

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
    /* if (loading) {
      return <LoadingScreen/>
    } */

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
      console.log('done loading')
      setLoading(false)
    })
  }

  return (
    <AssetsProvider> 
      <SoundProvider>
        <GameStateProvider>
          <AppWrapper className="App" theme={theme}>
            {renderActiveScreen()}
          </AppWrapper>
        </GameStateProvider>
      </SoundProvider>
    </AssetsProvider>
  );
}

export default App;
