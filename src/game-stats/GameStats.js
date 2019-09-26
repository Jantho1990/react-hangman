import React from 'react'
import styled from 'styled-components'
import useGameState from 'game-state/useGameState'

const GameStatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  & > * {
    margin-top: 0.5rem;
  }
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
  color: ${({ theme }) => theme.endgameModal.correctGuesses};
  text-transform: capitalize;
  &.wrong {
    color: ${({ theme }) => theme.endgameModal.wrongGuesses};
  }
`

export default function GameStats(props) {
  const {
    guessedLetters,
    getNumberOfWrongGuesses,
    theme,
    word
  } = useGameState()

  const wrongGuesses = getNumberOfWrongGuesses(word, guessedLetters)

  const renderWrongGuessCounter = () =>
    wrongGuesses > 0
      ? (
        <React.Fragment>
          <span>Incorrect Guesses:&nbsp;</span>
          <span>{ wrongGuesses }</span>
        </React.Fragment>
      ) : <span>You got them all correct! Great job!</span>

  return (
    <GameStatsWrapper>
      <GameStateItem>
        { renderWrongGuessCounter() }
      </GameStateItem>
      <GameStateItem>
        <span>{
          guessedLetters
            .filter(letter => word.indexOf(letter) === -1)
            .sort()
            .map((letter, i, wrongGuesses) => {
              return (
                <span>
                  <StatLetter correct={false} theme={theme}>{letter}</StatLetter>{i < wrongGuesses.length - 1 ? ' ' : ''}
                </span>
              )
            })
        }</span>
      </GameStateItem>
    </GameStatsWrapper>
  )
}