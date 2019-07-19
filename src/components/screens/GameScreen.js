import React, { useState } from 'react'
import styled from 'styled-components'
import useGameState from '../game-state/useGameState'
import LetterSelector from '../../components/LetterSelector'
import WordDisplay from '../../components/WordDisplay'
import FancyCounterView from '../../components/views/FancyCounterView'
import MenuButton from '../../components/buttons/MenuButton'
import AppHeader from '../../components/AppHeader'
import AppTitle from '../../components/AppTitle'
import PauseModal from '../../components/modals/PauseModal'

import { createRandomWord } from '../../lib/randomWord'

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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.gameScreen.backgroundColor};
  color: ${({ theme }) => theme.gameScreen.fontColor};
`

const GameScreenCenter = styled.div`
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
  flex: 3 3;
  overflow: hidden;
  margin-top: 3rem;
`

const PauseModalButton = styled(MenuButton)`
  width: auto;
`

function GameScreen(props) {
  const { theme, word, changeWord } = useGameState()
  const [guessedLetters, setGuessedLetters] = useState([])
  // const [randomWord, setRandomWord] = useState(word)
  const [paused, setPaused] = useState(false)
  const randomWord = word


  const { guesses: maxGuesses } = config

  const showPauseModal = () => {
    setPaused(true)
  }

  const handleCloseMenu = () => {
    setPaused(false)
  }

  const resetGame = () => {
    setGuessedLetters([])
    changeWord()
  }

  const handleRestart = () => {
    resetGame()
  }

  const handleUpdateGuessedLetters = ({ newLetter }) => {
    if (guessedLetters.find(guessedLetter => guessedLetter === newLetter) !== undefined) {
      return
    }

    setGuessedLetters(guessedLetters => [
      ...guessedLetters,
      newLetter
    ])
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

  const gameOver = guessesRemaining <= 0 || wordGuessed

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
            onUpdateGuessedLetters={handleUpdateGuessedLetters}
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
  );
}

export default GameScreen;
