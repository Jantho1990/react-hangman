import { useContext } from 'react'
import { GameStateContext } from './GameStateContext'
import { createRandomWord } from '../../lib/randomWord'
import themes from '../../themes'

const useGameState = () => {
  const [state, setState] = useContext(GameStateContext)
  console.log('state', state)

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
      word: createRandomWord()
    }))
  }

  return {
    theme: state.theme,
    changeTheme,
    word: state.word,
    changeWord
  }
}

export default useGameState