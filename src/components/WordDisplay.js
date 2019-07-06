import React, { Component } from 'react'
import styled from 'styled-components'

const LetterSpace = styled.span`
  color: black;
  font-size: 2rem;
  margin: 0 0.5rem;
  width: 1rem;
  display: inline-block;
  text-transform: capitalize;
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

  renderLetterSpace(letter) {
    const { guessedLetters } = this.props

    if (guessedLetters.find(guessedLetter => guessedLetter === letter) === undefined) {
      return <LetterSpace>&#95;</LetterSpace>
    }

    return <LetterSpace>{letter}</LetterSpace>
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