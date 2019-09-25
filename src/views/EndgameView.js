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
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  color: ${props => props.theme.primaryFontColor};
  background-color: ${props => props.theme.primaryBackgroundColor};
  & > * {
    margin: 0.5rem 0;
  }
`

const EndgameItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
`

const EndgameGallowsWrapper = styled.div`
  height: 200px;
  @media screen and (min-width: 568px) {
    height: auto;
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
            scale={false}
          />
          <GameStats/>
        </RightSide>
      </EndgameItem>
        {/* <span>
          {victory ? 'You win!' : 'You lose!'}
        </span> */}
        <MenuButton onClick={onPlayAgain}>Play Again</MenuButton>
        <MenuButton onClick={onQuit}>Quit</MenuButton>
    </EndgameViewWrapper>
  )
}
