import { useContext } from 'react'
import { FlagsContext } from 'flags/FlagsContext'

const useFlags = () => {
  const [{
    gameLoading,
    gameStart
  }, {
    setGameLoading,
    setGameStart
  }] = useContext(FlagsContext)
  console.log('game loading is', gameLoading)

  return {
    gameLoading,
    gameStart,
    startGameLoading: () => {console.log('start');setGameLoading(true);},
    finishGameLoading: () => {console.log('finish');setGameLoading(false)},
    startGameStart: () => setGameStart(true),
    finishGameStart: () => setGameStart(false)
  }
}

export default useFlags