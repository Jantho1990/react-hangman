import { useContext } from 'react'
import { GameStateContext } from 'game-state/GameStateContext'
import useAssets from 'assets/useAssets'
import useLocalStorage from 'local-storage/useLocalStorage'
import { createRandomWord } from 'lib/randomWord'
import themes from 'themes'

const useGameState = () => {
  const { isLoaded, data, onReady } = useAssets()
  const { setItem } = useLocalStorage()
  const [state, setState] = useContext(GameStateContext)

  // Update local storage
  Object.entries(state).forEach(([key, value]) => setItem(key, value))

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
   * Initiate game loading.
   *
   * @param {bool} value Turns the flag on or off.
   *
   * @return {void}
   */
  const setGameLoading = value => {
    console.log('game loading is', value)
    setState({
      ...state,
      gameLoading: value
    })
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
    // debugger
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
    setGameLoading(true)
    setState({
      ...state,
      gameOver: false,
      victory: false,
      guessedLetters: [],
      word: createRandomWord(data('wordList'))
    })
    window.setTimeout(setGameLoading(false), 1500)
  }

  // Set the random word once data is loaded.
  if (!isLoaded()) {
    onReady(assets => {
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
    resetGame,
    gameLoading: state.gameLoading,
    gameLoadStart: () => setGameLoading(true),
    gameLoadFinish: () => setGameLoading(false)
  }
}

export default useGameState