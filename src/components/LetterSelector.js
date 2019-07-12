import React, { Component } from 'react'
import styled from 'styled-components'

const LetterWrapper = styled.div`
  max-width: 50rem;
  margin: auto;
  margin-top: 3rem;
  height: 50vh;
  border-top: 1px solid hsl(0, 0%, 50%);
  background-color: hsl(0, 0%, 90%);
  overflow-y: scroll;
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
  padding: 0;
  height: 100%;
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

const handleLetterGuess = (letter, updateFunc) => {
  updateFunc({ newLetter: letter })
}

export default class LetterSelector extends Component {
  constructor(props) {
    super(props)

    this.isLetterGuessed = this.isLetterGuessed.bind(this)
    this.isLetterGuessedCorrectly = this.isLetterGuessedCorrectly.bind(this)
  }

  letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

  static defaultProps = {
    guessedLetters: []
  }

  isLetterGuessed(letter) {
    const { guessedLetters } = this.props
    
    return guessedLetters.find(guessedLetter => guessedLetter === letter) !== undefined
  }

  isLetterGuessedCorrectly(letter) {
    const { word } = this.props

    return word.indexOf(letter) !== -1 ? true : false
  }

  render() {
    const {
      letters,
      isLetterGuessed,
      isLetterGuessedCorrectly,
      props: { onUpdateGuessedLetters, gameOver }
    } = this

    const guessedClass = letter => isLetterGuessed(letter) ? 'guessed' : ''
    const guessedStatusClass = letter => isLetterGuessed(letter)
      ? isLetterGuessedCorrectly(letter)
        ? 'correctly'
        : 'wrongly'
      : ''

    let ct = 0
    let renderLetterButtons = () => {
      return (
        <ListContainer>
          {letters.map((letter, i) => {
            return (
              <ListItem
                className={`letter ${guessedClass(letter)} ${guessedStatusClass(letter)}`}
                guessed={isLetterGuessed(letter)}
                onClick={() => !gameOver ? handleLetterGuess(letter, onUpdateGuessedLetters) : null}
                key={`key-letter-${ct++}`}
              >
                {letter}
              </ListItem>
            )
          })}
        </ListContainer>
      )
    }

    return <LetterWrapper>{renderLetterButtons()}</LetterWrapper>
  }
}
