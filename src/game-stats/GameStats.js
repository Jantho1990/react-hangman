import React from 'react'
import styled from 'styled-components'
import useGameState from 'game-state/useGameState'
import LetterSpace from 'word-display/LetterSpace'

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

const StatLetter = styled.span.attrs(props => ({
  className: `${!props.correct ? 'wrong' : ''}`
}))`
  color: hsl(90, 65%, 60%);
  text-transform: capitalize;
  &.wrong {
    color: hsl(0, 65%, 60%);
  }
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
      <GameStateItem>
        <span>Guessed Letters</span>
        <span>{
          guessedLetters.map((letter, i) => {
            const correct = word.indexOf(letter) > -1
            return (
              <span>
                <StatLetter correct={correct}>{letter}</StatLetter> {i < guessedLetters.length - 1 ? ',' : ''}
              </span>
            )
          })
        }</span>
      </GameStateItem>
    </GameStatsWrapper>
  )
}