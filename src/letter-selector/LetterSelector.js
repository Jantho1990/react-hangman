import React from 'react'
import styled from 'styled-components'
import useGameState from 'game-state/useGameState'
import useSound from 'sound-manager/useSound'

const LetterWrapper = styled.div`
  max-width: 50rem;
  height: 100%;
  margin: auto;
  overflow-y: scroll;
  border-top: 1px solid ${({ theme: { gameScreen: { keyboard }} }) => keyboard.borderTop};
  @media screen and (min-width: 568px) {
    ${'' /* overflow-y: hidden; */}
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
  background-color: ${({ theme: { gameScreen: { keyboard }} }) => keyboard.backgroundColor};
  @media screen and (min-width: 768px) {
    padding: 0;
    height: auto;
    overflow: auto;
  }
`

const ListItem = styled.li`
  cursor: pointer;
  color: ${({ theme }) => theme.gameScreen.keyboard.keys.color.default};
  margin: 0.5em;
  padding: 0.5em;
  width: 1em;
  height: 1em;
  background-color: ${({ theme }) => theme.gameScreen.keyboard.keys.backgroundColor.default};
  user-select: none;
  transition: all ease-in 0.125s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ wordDisplay }) => wordDisplay};
  font-weight: bold;
  &.guessed {
    color: ${({ theme }) => theme.gameScreen.keyboard.keys.color.guessed};
  }
  &.guessed.correctly {
    background-color: ${({ theme }) => theme.gameScreen.keyboard.keys.backgroundColor.correct};
  }
  &.guessed.wrongly {
    background-color: ${({ theme }) => theme.gameScreen.keyboard.keys.backgroundColor.wrong};
  }
`


export default function LetterSelector(props) {
  const { className, gameOver } = props
  
  const {
    word,
    theme,
    guessedLetters,
    changeGuessedLetters,
    fonts: {
      wordDisplay
    }
  } = useGameState()

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
              theme={theme}
              wordDisplay={wordDisplay}
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
    <LetterWrapper className={className} theme={theme}>{renderLetterButtons()}</LetterWrapper>
  )
}
