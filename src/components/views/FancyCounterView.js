import React, { Component } from 'react'
import styled from 'styled-components'

const GuessCounter = styled.span`
  font-size: 10rem;
`

const svgCircle = styled.svg`

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

export default class FancyCounterView extends Component {
  static defaultProps = {
    maxGuesses: 8,
    wrongGuesses: 0,
    gameOver: false,
    victory: false
  }

  remainingGuesses = () => {
    const { maxGuesses, wrongGuesses } = this.props

    return maxGuesses - wrongGuesses
  }

  render () {
    const {
      remainingGuesses,
      props: { gameOver, victory }
    } = this

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
}