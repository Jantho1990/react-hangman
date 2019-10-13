import React, { useState, createContext, useContext } from 'react'

const FlagsContext = createContext([{}, () => {}])

/**
 * Handles a bunch of flags set independently from any state,
 * so the updates don't contaminate each other.
 */
const FlagsProvider = (props) => {
  const [gameLoading, setGameLoading] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [isOngoingGame, setIsOngoingGame] = useState(false)

  const flags = {
    gameLoading,
    isFirstLoad,
    isOngoingGame
  }
  
  const setFlags = {
    setGameLoading,
    setIsFirstLoad,
    setIsOngoingGame
  }

  return (
    <FlagsContext.Provider value={[flags, setFlags]}>
      {props.children}
    </FlagsContext.Provider>
  )
}

export { FlagsContext, FlagsProvider }