import React, { Component } from 'react'
import styled from 'styled-components'

const LetterSpace = styled.span`
  color: black;
  font-size: 2rem;
  margin: 0 0rem;
  width: 2rem;
  display: inline-block;
  text-transform: capitalize;
  user-select: none;
  &.not-guessed {
    color: hsl(0, 65%, 60%);
  }
`

export default class WordDisplay extends Component {
  constructor(props) {
    super(props)

    this.renderLetterSpace = this.renderLetterSpace.bind(this)
    this.renderLetterSpaces = this.renderLetterSpaces.bind(this)
  }
  
  static defaultProps = {
    word: 'testing',
    guessedLetters: []
  }

  ct = 0

  renderLetterSpace(letter) {
    const { guessedLetters, gameOver } = this.props
    
    if (guessedLetters.find(guessedLetter => guessedLetter === letter) === undefined) {
      if (gameOver) {
        return <LetterSpace className="not-guessed" key={`key-letterspace-${this.ct++}`}>{letter}</LetterSpace>
      } else {
        return <LetterSpace key={`key-letterspace-${this.ct++}`}>&#95;</LetterSpace>
      }
    }

    return <LetterSpace key={`key-letterspace-${this.ct++}`}>{letter}</LetterSpace>
  }

  renderLetterSpaces(word) {
    const letters = word.split('')

    return letters.map(letter => this.renderLetterSpace(letter))
  }

  render() {
    const { renderLetterSpaces, props: {word} } = this

    return (
      <div>
        {renderLetterSpaces(word)}
      </div>
    )
  }
}