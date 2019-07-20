import React, { Component } from 'react'
import styled from 'styled-components'
import LetterSpace from './LetterSpace'

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
    
    let letterGuessed = true
    if (guessedLetters.find(guessedLetter => guessedLetter === letter) === undefined) {
      letterGuessed = false
      /* if (gameOver) {
        return <LetterSpace wordLength={wordLength} letterGuessed={false} key={`key-letterspace-${this.ct++}`}>{letter}</LetterSpace>
      } else {
        return <LetterSpace wordLength={wordLength} key={`key-letterspace-${this.ct++}`}>&#95;</LetterSpace>
      } */
    }

    return <LetterSpace wordLength={wordLength} letterGuessed={letterGuessed} gameOver={gameOver} key={`key-letterspace-${this.ct++}`}>{letter}</LetterSpace>
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