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
    },
    fonts: {
      ...config.fonts
    },
    word: '',
    previousGame: {
      word: '',
      guessedLetters: [],
      victory: false
    },
    maxGuesses: config.guesses,
    guessedLetters: [],
    gameOver: false,
    victory: false,
    gameLoading: false
  })

  const [state, setState] = useState({
    theme: {
      name: defaultValues.theme.name,
      ...themes[defaultValues.theme.name]
    },
    fonts: defaultValues.fonts,
    word: defaultValues.word,
    previousGame: defaultValues.previousGame,
    maxGuesses: defaultValues.maxGuesses,
    guessedLetters: defaultValues.guessedLetters,
    gameOver: defaultValues.gameOver,
    victory: defaultValues.victory,
    gameLoading: defaultValues.gameLoading
  })

  return (
    <GameStateContext.Provider value={[state, setState]}>
      {props.children}
    </GameStateContext.Provider>
  )
}

export { GameStateContext, GameStateProvider }