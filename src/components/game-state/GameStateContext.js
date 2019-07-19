import React, { useState } from 'react'
import config from '../../config.json'
import themes from '../../themes'

const GameStateContext = React.createContext([{}, () => {}])

const GameStateProvider = (props) => {
  const word = ''

  const [state, setState] = useState({
    theme: {
      name: config.theme,
      ...themes[config.theme]
    },
    word
  })

  return (
    <GameStateContext.Provider value={[state, setState]}>
      {props.children}
    </GameStateContext.Provider>
  )
}

export { GameStateContext, GameStateProvider }