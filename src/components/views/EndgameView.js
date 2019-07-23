import React from 'react'
import styled from 'styled-components'
import useGameState from '../../game-state/useGameState'
import GallowsView from './GallowsView'
import WordDisplay from '../word-display/WordDisplay'
import MenuContainer from '../menus/MenuContainer'
import MenuButton from '../buttons/MenuButton'

const EndgameViewWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: ${props => props.theme.primaryFontColor}
`

export default function EndgameView({ onRestartGame, onSwitchScreen }) {
  const { theme, word, guessedLetters, maxGuesses, victory } = useGameState()

  const onPlayAgain = () => {
    onRestartGame()
  }

  const onQuit = () => {
    onSwitchScreen('MainMenuScreen')
  }

  return (
    <EndgameViewWrapper theme={theme}>
      <MenuContainer>
        <GallowsView
          wrongGuesses={maxGuesses}
          maxGuesses={maxGuesses}
          gameOver={true}
          victory={victory}
        />
        <WordDisplay
          word={word}
          guessedLetters={guessedLetters}
          gameOver={true}
        />
        <span>
          {victory ? 'You win!' : 'You lose!'}
        </span>
        <MenuButton onClick={onPlayAgain}>Play Again</MenuButton>
        <MenuButton onClick={onQuit}>Quit</MenuButton>
      </MenuContainer>
    </EndgameViewWrapper>
  )
}
