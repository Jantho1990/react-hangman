import React, { useState } from 'react'

const GameLoadingContext = React.createContext([{}, () => {}])

const GameLoadingProvider = (props) => {
  const [gameLoading, setGameLoading] = useState(false)
  console.log('smarmy', gameLoading)

  const wrapper = value => {
    console.log('set', value)
    return setGameLoading(value)
  }

  return (
    <GameLoadingContext.Provider value={[gameLoading, wrapper]}>
      {props.children}
    </GameLoadingContext.Provider>
  )
}

export { GameLoadingContext, GameLoadingProvider }