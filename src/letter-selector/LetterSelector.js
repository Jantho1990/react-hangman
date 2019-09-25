import React from 'react'
import styled from 'styled-components'
import useGameState from 'game-state/useGameState'
import useSound from 'sound-manager/useSound'

const LetterWrapper = styled.div`
  max-width: 50rem;
  height: 100%;
  margin: auto;
  overflow-y: scroll;
  border-top: 1px solid hsl(0, 0%, 50%);
  @media screen and (min-width: 568px) {
    overflow-y: hidden;
  }
  @media screen and (min-width: 768px) {
    overflow-y: auto;
  }
`

const ListContainer = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 1.5rem;
  list-style: none;
  text-transform: capitalize;
  margin: 0;
  padding: 0 1rem;
  background-color: hsl(0, 0%, 90%);
  background-color: ${({ theme: { gameScreen: { keyboard }} }) => keyboard.backgroundColor};
  @media screen and (min-width: 568px) {
    height: 100%;
    overflow-y: scroll;
  }
  @media screen and (min-width: 768px) {
    padding: 0;
    height: auto;
    overflow: auto;
  }
`

const ListItem = styled.li`
  cursor: pointer;
  color: hsl(0, 0%, 10%);
  margin: 0.5em;
  padding: 0.5em;
  width: 1em;
  height: 1em;
  background-color: hsl(0, 0%, 65%);
  user-select: none;
  transition: all ease-in 0.125s;
  display: flex;
  align-items: center;
  justify-content: center;
  &.guessed {
    color: hsl(0, 0%, 90%);
  }
  &.guessed.correctly {
    background-color: hsl(90, 65%, 40%);
  }
  &.guessed.wrongly {
    background-color: hsl(0, 65%, 40%);
  }
`


export default function LetterSelector(props) {
  const { className, gameOver } = props
  
  const { word, theme, guessedLetters, changeGuessedLetters } = useGameState()

  const { play } = useSound()
  
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  
  const handleLetterGuess = letter => {
    const letterGuessed = isLetterGuessed(letter)
    if (!letterGuessed) {
      play('KeyEnter1')
      changeGuessedLetters(letter)
      if (isLetterGuessedCorrectly(letter)) {
        play('Whoosh')
      }
    }
  }

  const isLetterGuessed = letter => {
    return guessedLetters.find(guessedLetter => guessedLetter === letter) !== undefined
  }

  const isLetterGuessedCorrectly = letter => {
    return word.indexOf(letter) !== -1 ? true : false
  }

  const renderLetterButtons = () => {
    return (
      <ListContainer theme={theme}>
        {letters.map((letter, i) => {
          return (
            <ListItem
              className={`letter ${guessedClass(letter)} ${guessedStatusClass(letter)}`}
              guessed={isLetterGuessed(letter)}
              onClick={() => !gameOver ? handleLetterGuess(letter) : null}
              key={`key-letter-${i}`}
            >
              {letter}
            </ListItem>
          )
        })}
      </ListContainer>
    )
  }
  
  const guessedClass = letter => isLetterGuessed(letter) ? 'guessed' : ''
  const guessedStatusClass = letter => isLetterGuessed(letter)
    ? isLetterGuessedCorrectly(letter)
      ? 'correctly'
      : 'wrongly'
    : ''

  return (
    <LetterWrapper className={className}>{renderLetterButtons()}</LetterWrapper>
  )
}
