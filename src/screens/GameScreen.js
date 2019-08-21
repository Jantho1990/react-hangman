import React, { useState } from 'react'
import styled from 'styled-components'
import { useSpring, useTransition, animated } from 'react-spring'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useGameState from '../../game-state/useGameState'
import useSound from '../../sound-manager/useSound'
import LetterSelector from 'letter-selector/LetterSelector'
import WordDisplay from '../../components/word-display/WordDisplay'
import FancyCounterView from '../../components/views/FancyCounterView'
import GallowsView from '../../components/views/GallowsView'
import MenuButton from '../../inputs/MenuButton'
import AppHeader from '../../components/AppHeader'
import AppTitle from '../../components/AppTitle'
import PauseModal from '../../components/modals/PauseModal'
import EndgameModal from '../../components/modals/EndgameModal'
import config from '../../config'

library.add(faBars)

const GameScreenWrapper = styled.div`
  text-align: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const GameScreenMain = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr 3fr 3fr;
  grid-template-rows: 10vh 45vh 45vh;
  grid-template-areas:
    "header"
    "center"
    "footer";
  background-color: ${({ theme }) => theme.gameScreen.backgroundColor};
  color: ${({ theme }) => theme.gameScreen.fontColor};
  @media screen and (min-width: 568px) {
    grid-template-columns: 1fr 1fr;
    grid-template-columns: 60vw 40vw;
    grid-template-rows: 1fr 4fr;
    grid-template-rows: 20vh 80vh;
    grid-template-areas:
      "header header"
      "center footer";
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: auto;
    grid-template-rows: 1fr 3fr 3fr;
    grid-template-rows: 10vh 45vh 45vh;
    grid-template-areas:
      "header"
      "center"
      "footer";
  }
`

const GameScreenCenter = styled.div`
  grid-area: center;
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 3rem;

  @media screen and (min-width: 568px) {
    margin-bottom: 0;
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
    margin-bottom: 3rem;
  }
`

const GameScreenBottomWrapper = styled.div`
  height: 100%;
  flex: 3 3;
  overflow: hidden;
`

const GameScreenBottom = ({children}) => {
  const springFooter = useSpring({
    from: { transform: 'translate3d(0, 500%, 0)' },
    to: { transform: 'translate3d(0, 0%, 0)' },
    delay: 550
  })

  return (
    <animated.div style={{...springFooter, gridArea: 'footer', overflow: 'hidden'}}>
      <GameScreenBottomWrapper>
        {children}
      </GameScreenBottomWrapper>
    </animated.div>
  )
}

const PauseModalButton = styled(MenuButton)`
  width: auto;
  margin-right: 0.25rem;
`

function GameScreen({ onSwitchScreen }) {
  const {
    theme,
    word: randomWord,
    guessedLetters,
    getNumberOfWrongGuesses,
    gameOver,
    declareGameOver,
    resetGame
  } = useGameState()

  const { play, isPlaying } = useSound()
  if (!isPlaying('BackgroundMusic')) {
    play('BackgroundMusic')
  }

  const [paused, setPaused] = useState(false)
  const { guesses: maxGuesses } = config

  const showPauseModal = () => {
    setPaused(true)
  }

  const handleCloseMenu = () => {
    setPaused(false)
  }

  const handleRestart = () => {
    resetGame()
  }

  const wrongGuesses = getNumberOfWrongGuesses(randomWord, guessedLetters)

  const guessesRemaining = maxGuesses - wrongGuesses

  const wordGuessed = randomWord.split('')
    .reduce((carry, letter) => {
       return carry
          ? guessedLetters.indexOf(letter) !== -1
          : false
    }, true)

  if (!gameOver && (guessesRemaining <= 0 || wordGuessed)) {
    declareGameOver(wordGuessed)
  }

  // Pause menu enter/leave animation.
  const pauseMenuTransition = useTransition(paused, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  const renderPauseMenu = () => {
    return pauseMenuTransition.map(({item, key, props}) => {
      return (
        <animated.div key={key} style={{...props, position: 'fixed', height: '100%', width: '100%'}}>
          {item && 
            <PauseModal
              show={paused}
              onCloseMenu={handleCloseMenu}
              onSwitchScreen={onSwitchScreen}
              onRestartGame={handleRestart}
            />
          }
        </animated.div>
      )
    })
  }
  
  // Endgame modal enter/leave animation.
  const endgameMenuTransition = useTransition(gameOver, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  const renderEndgameModal = () => {
    return endgameMenuTransition.map(({item, key, props}) => {
      return (
        <animated.div key={key} style={{...props, position: 'fixed', height: '100%', width: '100%'}}>
          {item && 
            <EndgameModal
              onSwitchScreen={onSwitchScreen}
              onRestartGame={handleRestart}
            />
          }
        </animated.div>
      )
    })
  }

  return (
    <GameScreenWrapper className="GameScreen">
      <GameScreenMain theme={theme} className="GameScreen-main">
        <AppHeader theme={theme} className="GameScreen-header">
          <AppTitle>React Hangman</AppTitle>
          <PauseModalButton
            onClick={() => showPauseModal()}
          >
            <FontAwesomeIcon icon="bars"/>
          </PauseModalButton>
        </AppHeader>

        <GameScreenCenter className="GameScreen-center">
          <GallowsView
            wrongGuesses={wrongGuesses}
            maxGuesses={maxGuesses}
            gameOver={gameOver}
            victory={wordGuessed}
          />

          <WordDisplay
            word={randomWord}
            guessedLetters={guessedLetters}
            gameOver={gameOver}
          />
        </GameScreenCenter>

        <GameScreenBottom>
          <LetterSelector
            className="GameScreen-bottom"
            guessedLetters={guessedLetters}
            gameOver={gameOver}
            word={randomWord}
          />
        </GameScreenBottom>
      </GameScreenMain>
      {renderPauseMenu()}
      {renderEndgameModal()}
    </GameScreenWrapper>
  )
}

export default GameScreen
