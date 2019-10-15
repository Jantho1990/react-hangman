import React, { Component } from 'react'
import styled from 'styled-components'

const GuessCounter = styled.span`
  font-size: 3rem;
`

export default class CounterGallows extends Component {
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
      ? `${remainingGuesses()} guesses remaining!`
      : ''
    
    const gameOverText = gameOver
      ? victory
        ? 'You win!'
        : 'Game over!'
      : ''

    return (
      <div>
        <GuessCounter>
          {wrongGuessesRemaining()}
          {gameOverText}
        </GuessCounter>
      </div>
    )
  }
}