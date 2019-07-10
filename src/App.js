import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import LetterSelector from './components/LetterSelector'
import WordDisplay from './components/WordDisplay'
import CounterView from './components/views/CounterView'

import randomWord from './lib/randomWord'

import config from './config'

function App() {
  const [guessedLetters, setGuessedLetters] = useState([])

  const { guesses: maxGuesses } = config

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
      <header className="App-header">
        <h1>React Hangman</h1>
      </header>

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

      <LetterSelector
        guessedLetters={guessedLetters}
        onUpdateGuessedLetters={handleUpdateGuessedLetters}
        gameOver={gameOver}
        word={randomWord}
      />
    </div>
  );
}

export default App;
