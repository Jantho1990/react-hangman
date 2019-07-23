import React from 'react'
import styled from 'styled-components'
import useGameState from '../../game-state/useGameState'
import GallowsView from './GallowsView'
import WordDisplay from '../word-display/WordDisplay'
import MenuButton from '../buttons/MenuButton'

const EndgameViewWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: ${props => props.theme.primaryFontColor}
`

export default function EndgameView() {
  const { theme, word, guessedLetters, maxGuesses, victory } = useGameState()

  console.log('max', maxGuesses)
  return (
    <EndgameViewWrapper theme={theme}>
      <GallowsView
        wrongGuesses={maxGuesses}
        maxGuesses={maxGuesses}
        gameOver={true}
        victory={victory}
      />
      <WordDisplay
        word={word}
        guessedLetters={guessedLetters}
        gameOver={true}
      />
      <span>
        {victory ? 'You win!' : 'You lose!'}
      </span>
    </EndgameViewWrapper>
  )
}
