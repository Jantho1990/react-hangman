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
    changeWord,
    guessedLetters: state.guessedLetters,
    changeGuessedLetters
  }
}

export default useGameState