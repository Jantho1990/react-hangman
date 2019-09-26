import { useContext } from 'react'
import { FlagsContext } from 'flags/FlagsContext'

const useFlags = () => {
  const [{
    gameLoading,
    isFirstLoad,
    isOngoingGame
  }, {
    setGameLoading,
    setIsFirstLoad,
    setIsOngoingGame
  }] = useContext(FlagsContext)
  console.log('game loading is', gameLoading)

  return {
    gameLoading,
    isFirstLoad,
    isOngoingGame,
    startGameLoading: () => {console.log('start');setGameLoading(true);},
    finishGameLoading: () => {console.log('finish');setGameLoading(false)},
    firstLoadFinished: () => setIsFirstLoad(false),
    setIsOngoingGame
  }
}

export default useFlags