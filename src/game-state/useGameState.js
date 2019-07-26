import { useContext } from 'react'
import { GameStateContext } from './GameStateContext'
import useAssets from '../assets/useAssets'
import { createRandomWord } from '../lib/randomWord'
import themes from '../themes'

const useGameState = () => {
  const { isLoaded, data, onReady } = useAssets()
  const [state, setState] = useContext(GameStateContext)

  /**
   * Change the application visual theme.
   *
   * @param {string} themeName The theme to change to.
   *
   * @return {void}
   */
  function changeTheme(themeName) {
    setState(state => ({
      ...state,
      theme: {
        name: themeName,
        ...themes[themeName]
      }
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
  }

  /**
   * Reset the game.
   *
   * @return {void}
   */
  const resetGame = () => {
    setState({
      ...state,
      gameOver: false,
      victory: false,
      guessedLetters: [],
      word: createRandomWord(data('wordList'))
    })
  }

  // Set the random word once data is loaded.
  if (!isLoaded()) {
    console.log('am i')
    onReady(assets => {
      console.log('here', assets, state)
      setState(state => ({
        ...state,
        word: createRandomWord(assets.data['wordList']) // Accessed as an array here because assets is just the whole list of assets, not the access functions.
      }))
    })
  }

  return {
    theme: state.theme,
    changeTheme,
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