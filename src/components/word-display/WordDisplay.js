import React from 'react'
import styled from 'styled-components'
import LetterSpace from './LetterSpace'
import useGameState from '../../game-state/useGameState'

const WordDisplayWrapper = styled.div`

`

export default function WordDisplay(props) {
  const { word, guessedLetters } = useGameState()
  const { gameOver } = props
  
  let ct = 0

  const renderLetterSpace = letter => {
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

    return <LetterSpace wordLength={wordLength} letterGuessed={letterGuessed} gameOver={gameOver} key={`key-letterspace-${ct++}`}>{letter}</LetterSpace>
  }

  const renderLetterSpaces = word => {
    const letters = word.split('')

    return letters.map(letter => renderLetterSpace(letter))
  }

  return (
    <WordDisplayWrapper>
      {renderLetterSpaces(word)}
    </WordDisplayWrapper>
  )
}