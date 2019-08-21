import React from 'react'
import styled from 'styled-components'
import LetterSpace from 'word-display/LetterSpace'

const WordDisplayWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-evenly;
  ${'' /* min-height: 10rem; */}
  padding: 1vh 3vw;
`

export default function WordDisplay({ word, guessedLetters, gameOver, displayWord }) {
  
  let ct = 0

  const renderLetterSpace = letter => {
    const wordLength = word.length
    
    let letterGuessed = guessedLetters.find(guessedLetter => guessedLetter === letter) !== undefined
      ? true
      : false

    let display = (displayWord || letterGuessed || gameOver)
      ? true
      : false

    return <LetterSpace wordLength={wordLength} guessed={letterGuessed} display={display} key={`key-letterspace-${ct++}`}>{letter}</LetterSpace>
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