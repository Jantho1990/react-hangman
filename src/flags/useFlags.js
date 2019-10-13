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

  return {
    gameLoading,
    isFirstLoad,
    isOngoingGame,
    startGameLoading: () => setGameLoading(true),
    finishGameLoading: () => setGameLoading(false),
    firstLoadFinished: () => setIsFirstLoad(false),
    setIsOngoingGame
  }
}

export default useFlags