import { useContext } from 'react'
import { GameLoadingContext } from 'game-loading/GameLoadingContext'

const useGameLoading = () => {
  const [gameLoading, setGameLoading] = useContext(GameLoadingContext)
  console.log('game loading is', gameLoading)

  return {
    gameLoading,
    isGameLoading: () => gameLoading,
    startGameLoading: () => {console.log('start');setGameLoading(true);},
    finishGameLoading: () => {console.log('finish');setGameLoading(false)}
  }
}

export default useGameLoading