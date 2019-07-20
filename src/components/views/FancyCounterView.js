import React, { Component } from 'react'
import styled from 'styled-components'
import useGameState from '../../game-state/useGameState'

const GuessCounter = styled.span`
  font-size: 10rem;
`

const GameOverText = styled.span`
  font-size: 3rem;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`

export default function FancyCounterView(props) {
  const { maxGuesses, wrongGuesses, gameOver, victory } = props

  const remainingGuesses = () => maxGuesses - wrongGuesses

  const wrongGuessesRemaining = () => !gameOver
    ? `${remainingGuesses()}`
    : ''
  
  const gameOverText = gameOver
    ? victory
      ? 'You win!'
      : 'Game over!'
    : ''
  
  return (
    <Container>
      <GuessCounter>
        {wrongGuessesRemaining()}
      </GuessCounter>
      <GameOverText>
        {gameOverText}
      </GameOverText>
    </Container>
  )
}