import React, { useState } from 'react'
import useLocalStorage from 'local-storage/useLocalStorage'
import config from 'config.json'
import themes from 'themes'

const GameStateContext = React.createContext([{}, () => {}])

const GameStateProvider = (props) => {
  const { hydrateState } = useLocalStorage()
  const defaultValues = hydrateState({
    theme: {
      name: config.theme,
      ...themes[config.theme]
    }
  })

  const [state, setState] = useState({
    theme: defaultValues.theme,
    word: '',
    previousGame: {
      word: '',
      guessedLetters: [],
      victory: false
    },
    maxGuesses: config.guesses,
    guessedLetters: [],
    gameOver: false,
    victory: false
  })

  return (
    <GameStateContext.Provider value={[state, setState]}>
      {props.children}
    </GameStateContext.Provider>
  )
}

export { GameStateContext, GameStateProvider }