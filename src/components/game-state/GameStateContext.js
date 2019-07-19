import React, { useState } from 'react'
import useAssets from '../../assets/useAssets'
import config from '../../config.json'
import themes from '../../themes'
import { createRandomWord } from '../../lib/randomWord'

const GameStateContext = React.createContext([{}, () => {}])

const GameStateProvider = (props) => {
  const { data } = useAssets()

  const word = createRandomWord(data('wordList'))

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