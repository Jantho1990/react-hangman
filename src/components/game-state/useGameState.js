import { useContext } from 'react'
import { GameStateContext } from './GameStateContext'
import themes from '../../themes'

const useGameState = () => {
  const [state, setState] = useContext(GameStateContext)

  changeTheme (themeName) {
    setState(state => ({
      ...state,
      theme: {
        name: themeName,
        ...themes[themeName]
      }
    })
  }

  return {
    changeTheme
  }
}

export default useGameState