import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import LetterSelector from './components/LetterSelector'
import WordDisplay from './components/WordDisplay'

import randomWord from './lib/randomWord'

function App() {
  const [guessedLetters, setGuessedLetters] = useState([])

  const handleUpdateGuessedLetters = ({ newLetter }) => {
    if (guessedLetters.find(guessedLetter => guessedLetter === newLetter) !== undefined) {
      return
    }

    setGuessedLetters(guessedLetters => [
      ...guessedLetters,
      newLetter
    ])
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Hangman</h1>
      </header>
      <WordDisplay
        word={randomWord}
        guessedLetters={guessedLetters}
      />
      <LetterSelector
        guessedLetters={guessedLetters}
        onUpdateGuessedLetters={handleUpdateGuessedLetters}
        word={randomWord}
      />
    </div>
  );
}

export default App;
