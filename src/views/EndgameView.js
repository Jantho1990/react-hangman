import React from 'react'
import styled from 'styled-components'
import useGameState from 'game-state/useGameState'
import GallowsView from 'views/GallowsView'
import WordDisplay from 'word-display/WordDisplay'
import MenuButton from 'inputs/MenuButton'
import GameStats from 'game-stats/GameStats'

const EndgameViewWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem;
  color: ${props => props.theme.primaryFontColor};
  background-color: ${props => props.theme.primaryBackgroundColor};
  & > * {
    margin: 0.5rem 0;
  }
  @media screen and (min-width: 768px) {
    width: auto;
    height: auto;
  }
`

const EndgameItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
  @media screen and (max-height: 360px) {
    flex-direction: row;
  }
`

const EndgameGallowsWrapper = styled.div`
  height: 200px;
  @media screen and (min-width: 568px) {
    height: auto;
  }
  @media screen and (min-width: 768px) {
    height: 200px;
  }
`

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  & > * {
    margin-top: 1rem;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  & > * {
    margin: 0.5rem;
  }
  @media screen and (max-height: 360px) {
    flex-direction: row;
  }
`

export default function EndgameView({ onRestartGame, onSwitchScreen }) {
  const {
    theme,
    gameOver,
    previousGame: { word, guessedLetters, victory },
    maxGuesses,
    getNumberOfWrongGuesses 
  } = useGameState()

  const onPlayAgain = () => {
    onRestartGame()
  }

  const onQuit = () => {
    onSwitchScreen('MainMenuScreen')
  }

  const wrongGuesses = getNumberOfWrongGuesses(word, guessedLetters)

  // Need to change WordDisplay scale based on whether we are in desktop or mobile viewport size.
  const innerWidth = window.innerWidth
  const scale = innerWidth > 768 ? 0.4 : 1

  return (
    <EndgameViewWrapper theme={theme}>
      <EndgameItem>
        <EndgameGallowsWrapper>
          <GallowsView
            wrongGuesses={wrongGuesses}
            maxGuesses={maxGuesses}
            gameOver={gameOver}
            victory={victory}
          />
        </EndgameGallowsWrapper>
        <RightSide>
          <WordDisplay
            word={word}
            guessedLetters={guessedLetters}
            displayWord={true}
            gameOver={gameOver}
            scale={scale}
          />
          <GameStats word={word} guessedLetters={guessedLetters}/>
        </RightSide>
      </EndgameItem>
      <ButtonWrapper>
        <MenuButton onClick={onPlayAgain}>Play Again</MenuButton>
        <MenuButton onClick={onQuit}>Quit</MenuButton>
      </ButtonWrapper>
    </EndgameViewWrapper>
  )
}
