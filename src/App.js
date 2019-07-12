import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import LetterSelector from './components/LetterSelector'
import WordDisplay from './components/WordDisplay'
import CounterView from './components/views/CounterView'
import MenuButton from './components/buttons/MenuButton'
import AppHeader from './components/AppHeader'
import AppTitle from './components/AppTitle'
import PauseMenu from './components/menus/PauseMenu'

import randomWord from './lib/randomWord'

import config from './config'

function App() {
  const [guessedLetters, setGuessedLetters] = useState([])
  const [paused, setPaused] = useState(false)

  const { guesses: maxGuesses } = config

  const showPauseMenu = () => {
    setPaused(true)
  }

  const handleCloseMenu = () => {
    setPaused(false)
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
    <div className="App">
      <div className="App-main">
        <AppHeader className="App-header">
          <AppTitle>React Hangman</AppTitle>
          <MenuButton
            onClick={() => showPauseMenu()}
          >
            Menu
          </MenuButton>
        </AppHeader>

        <div className="App-center">
          <CounterView
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
        </div>

        <LetterSelector
          className="App-bottom"
          guessedLetters={guessedLetters}
          onUpdateGuessedLetters={handleUpdateGuessedLetters}
          gameOver={gameOver}
          word={randomWord}
        />
      </div>
      <PauseMenu
        show={paused}
        onCloseMenu={handleCloseMenu}
      />
    </div>
  );
}

export default App;
