import { useContext } from 'react'
import { GameStateContext } from './GameStateContext'
import useAssets from '../assets/useAssets'
import { createRandomWord } from '../lib/randomWord'
import themes from '../themes'

const useGameState = () => {
  const { isLoaded, data, onReady } = useAssets()
  const [state, setState] = useContext(GameStateContext)

  function changeTheme(themeName) {
    setState(state => ({
      ...state,
      theme: {
        name: themeName,
        ...themes[themeName]
      }
    }))
  }

  const changeWord = () => {
    setState(state => ({
      ...state,
      word: createRandomWord(data('wordList'))
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
    changeWord
  }
}

export default useGameState