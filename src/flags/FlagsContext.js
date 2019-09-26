import React, { useState, createContext, useContext } from 'react'

const FlagsContext = createContext([{}, () => {}])
console.log('fish')

/**
 * Handles a bunch of flags set independently from any state,
 * so the updates don't contaminate each other.
 */
const FlagsProvider = (props) => {
  const [gameLoading, setGameLoading] = useState(false)
  const [gameStart, setGameStart] = useState(false)
  console.log('rabbit', gameLoading)

  const flags = {
    gameLoading,
    gameStart
  }
  
  const setFlags = {
    setGameLoading,
    setGameStart
  }

  return (
    <FlagsContext.Provider value={[flags, setFlags]}>
      {props.children}
    </FlagsContext.Provider>
  )
}

export { FlagsContext, FlagsProvider }