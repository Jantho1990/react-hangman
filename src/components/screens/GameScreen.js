import React, { useState } from 'react'
import styled from 'styled-components'
import useGameState from '../../game-state/useGameState'
import LetterSelector from '../../components/LetterSelector'
import WordDisplay from '../../components/word-display/WordDisplay'
import FancyCounterView from '../../components/views/FancyCounterView'
import MenuButton from '../../components/buttons/MenuButton'
import AppHeader from '../../components/AppHeader'
import AppTitle from '../../components/AppTitle'
import PauseModal from '../../components/modals/PauseModal'
import config from '../../config'

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
  grid-template-areas:
    "header"
    "center"
    "footer";
  background-color: ${({ theme }) => theme.gameScreen.backgroundColor};
  color: ${({ theme }) => theme.gameScreen.fontColor};
  @media screen and (min-width: 568px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 4fr;
    grid-template-areas:
      "header header"
      "center footer";
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: auto;
    grid-template-rows: 1fr 3fr 3fr;
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

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`

const GameScreenBottom = styled.div`
  grid-area: footer;
  flex: 3 3;
  overflow: hidden;
  margin-top: 3rem;
  @media screen and (min-width: 568px) {
    margin-top: 0;
  }
  @media screen and (min-width: 768px) {
    margin-top: 3rem;
  }
`

const PauseModalButton = styled(MenuButton)`
  width: auto;
`

function GameScreen(props) {
  const {
    theme,
    word: randomWord,
    guessedLetters,
    gameOver,
    declareGameOver,
    resetGame
  } = useGameState()

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

  const wrongGuesses = guessedLetters.reduce((carry, letter) => {
    return randomWord.indexOf(letter) === -1 ? carry + 1 : carry
  }, 0)

  const guessesRemaining = maxGuesses - wrongGuesses

  const wordGuessed = randomWord.split('')
    .reduce((carry, letter) => {
       return carry
          ? guessedLetters.indexOf(letter) !== -1
          : false
    }, true)

  if (!gameOver && (guessesRemaining <= 0 || wordGuessed)) {
    declareGameOver()
  }

  return (
    <GameScreenWrapper className="GameScreen">
      <GameScreenMain theme={theme} className="GameScreen-main">
        <AppHeader theme={theme} className="GameScreen-header">
          <AppTitle>React Hangman</AppTitle>
          <PauseModalButton
            onClick={() => showPauseModal()}
          >
            Menu
          </PauseModalButton>
        </AppHeader>

        <GameScreenCenter className="GameScreen-center">
          <FancyCounterView
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
      <PauseModal
        show={paused}
        onCloseMenu={handleCloseMenu}
        onSwitchScreen={props.onSwitchScreen}
        onRestartGame={handleRestart}
      />
    </GameScreenWrapper>
  )
}

export default GameScreen
