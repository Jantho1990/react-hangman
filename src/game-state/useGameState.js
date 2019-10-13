import { useContext, useState } from 'react'
import { GameStateContext } from 'game-state/GameStateContext'
import useAssets from 'assets/useAssets'
import useFlags from 'flags/useFlags'
import useLocalStorage from 'local-storage/useLocalStorage'
import { createRandomWord } from 'lib/randomWord'
import themes from 'themes'

const saveGameStateToLocalStorage = (gameState, setItem) => {
  // Values to save to local storage
  const saveKeys = [
    'word',
    'guessedLetters',
    'gameOver',
    'victory',
    'previousGame'
  ]

  // Update local storage
  const localStorageState = Object.entries(gameState)
    .filter(([key]) => {
      return saveKeys.indexOf(key) > -1
    })
    .forEach(([key, value]) => setItem(key, value))
}

const useGameState = () => {
  const { isLoaded, data, onReady } = useAssets()
  const { setItem } = useLocalStorage()
  const { startGameLoading, finishGameLoading, setIsOngoingGame }  = useFlags()
  const [state, setState] = useContext(GameStateContext)

  saveGameStateToLocalStorage(state, setItem)

  /**
   * Change the application visual theme.
   *
   * @param {string} themeName The theme to change to.
   *
   * @return {void}
   */
  function changeTheme(themeName) {
    const theme = {
      name: themeName,
      ...themes[themeName]
    }
    
    setItem('theme', theme)

    setState(state => ({
      ...state,
      theme
    }))
  }

  /**
   * Create a new random word.
   *
   * @return {void}
   */
  const changeWord = () => {
    setState(state => ({
      ...state,
      word: createRandomWord(data('wordList'))
    }))
  }

  /**
   * Update the guessed letters array.
   *
   * @param {string} newLetter The new letter to add.
   *
   * @return {void}
   */
  const changeGuessedLetters = (newLetter) => {
    const { guessedLetters } = state

    if (guessedLetters.find(guessedLetter => guessedLetter === newLetter) !== undefined) {
      return
    }

    setState(state => ({
      ...state,
      guessedLetters: [
        ...guessedLetters,
        newLetter
      ]
    }))
  }

  /**
   * Returns the number of incorrectly-guessed letters in a word.
   * 
   * @param {string} word The word being guessed.
   * @param {array} guessedLetters The currently-guessed letters.
   *
   * @return {number} The number of incorrectly-guessed letters.
   */
  const getNumberOfWrongGuesses = (word, guessedLetters) => {
    return guessedLetters.reduce((carry, letter) => {
      return word.indexOf(letter) === -1 ? carry + 1 : carry
    }, 0)
  }

  /**
   * Reset the guessed letters array to empty.
   *
   * @return {void}
   */
  const resetGuessedLetters = () => {
    setState({
      ...state,
      guessedLetters: []
    })
  }

  /**
   * Toggle game over.
   *
   * @return {void}
   */
  const declareGameOver = (victory = false) => {
    const { word, guessedLetters } = state
    
    setState({
      ...state,
      gameOver: true,
      victory,
      previousGame: {
        word,
        guessedLetters,
        victory
      }
    })

    setIsOngoingGame(false)
  }

  /**
   * Reset the game.
   *
   * @return {void}
   */
  const resetGame = () => {
    startGameLoading()
    setState({
      ...state,
      gameOver: false,
      victory: false,
      guessedLetters: [],
      word: createRandomWord(data('wordList'))
    })
    window.setTimeout(finishGameLoading, 1500)
  }

  return {
    theme: state.theme,
    changeTheme,
    fonts: {
      ...state.fonts
    },
    word: state.word,
    previousGame: state.previousGame,
    changeWord,
    maxGuesses: state.maxGuesses,
    guessedLetters: state.guessedLetters,
    getNumberOfWrongGuesses,
    changeGuessedLetters,
    resetGuessedLetters,
    gameOver: state.gameOver,
    declareGameOver,
    victory: state.victory,
    resetGame
  }
}

export default useGameState