import React from 'react'
import styled from 'styled-components'
import useGameState from './game-state/useGameState'
import useAssets from '../assets/useAssets'

const LetterWrapper = styled.div`
  max-width: 50rem;
  height: 100%;
  margin: auto;
  ${'' /* margin-top: 3rem; */}
  overflow-y: scroll;
  border-top: 1px solid hsl(0, 0%, 50%);
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
  @media screen and (min-width: 768px) {
    padding: 0;
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
  // const isLetterGuessed = this.isLetterGuessed.bind(this)
  // const isLetterGuessedCorrectly = this.isLetterGuessedCorrectly.bind(this)
  const { word, className, gameOver, onUpdateGuessedLetters, guessedLetters } = props
  
  const { theme } = useGameState()

  const { sound } = useAssets()
  
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  
  const handleLetterGuess = (letter, updateFunc) => {
    // keySound.play()
    sound('KeyEnter1').play()
    updateFunc({ newLetter: letter })
  }

  const isLetterGuessed = letter => {
    return guessedLetters.find(guessedLetter => guessedLetter === letter) !== undefined
  }

  const isLetterGuessedCorrectly = letter => {
    return word.indexOf(letter) !== -1 ? true : false
  }

  const renderLetterButtons = () => {
    console.log('render list buttons')
    return (
      <ListContainer theme={theme}>
        {letters.map((letter, i) => {
          console.log(letter)
          return (
            <ListItem
              className={`letter ${guessedClass(letter)} ${guessedStatusClass(letter)}`}
              guessed={isLetterGuessed(letter)}
              onClick={() => !gameOver ? handleLetterGuess(letter, onUpdateGuessedLetters) : null}
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
