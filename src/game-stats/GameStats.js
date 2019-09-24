import React from 'react'
import styled from 'styled-components'
import useGameState from 'game-state/useGameState'

const GameStatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

const GameStateItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

export default function GameStats(props) {
  const {
    guessedLetters,
    getNumberOfWrongGuesses,
    word
  } = useGameState()

  const wrongGuesses = getNumberOfWrongGuesses(word, guessedLetters)

  return (
    <GameStatsWrapper>
      <GameStateItem>
        <span>Incorrect Guesses:</span>
        <span>{ wrongGuesses }</span>
      </GameStateItem>
    </GameStatsWrapper>
  )
}