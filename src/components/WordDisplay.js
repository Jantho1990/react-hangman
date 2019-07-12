import React, { Component } from 'react'
import styled from 'styled-components'

const LetterSpace = styled.span.attrs(props => ({
  fontSize: `calc(50vw / ${props.wordLength})`,
  fontSizeMobile: `calc(90vw / ${props.wordLength})`
}))`
  color: black;
  font-size: 2rem;
  font-size: ${({ fontSizeMobile }) => fontSizeMobile};
  margin: 0 0rem;
  width: 2rem;
  width: ${({ fontSizeMobile }) => fontSizeMobile};
  display: inline-block;
  text-transform: capitalize;
  user-select: none;
  &.not-guessed {
    color: hsl(0, 65%, 60%);
  }
  @media screen and (min-width: 768px) {
    font-size: ${({ fontSize }) => fontSize};
    width: ${({ fontSize }) => fontSize};
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
    const { guessedLetters, gameOver, word } = this.props

    const wordLength = word.length
    
    if (guessedLetters.find(guessedLetter => guessedLetter === letter) === undefined) {
      if (gameOver) {
        return <LetterSpace wordLength={wordLength} className="not-guessed" key={`key-letterspace-${this.ct++}`}>{letter}</LetterSpace>
      } else {
        return <LetterSpace wordLength={wordLength} key={`key-letterspace-${this.ct++}`}>&#95;</LetterSpace>
      }
    }

    return <LetterSpace wordLength={wordLength} key={`key-letterspace-${this.ct++}`}>{letter}</LetterSpace>
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