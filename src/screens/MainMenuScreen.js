import React from 'react'
import styled from 'styled-components'
import MenuButton from 'inputs/MenuButton'
import useGameState from 'game-state/useGameState'
import useFlags from 'flags/useFlags'

const MainMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: center;
  height: 100%;
  background-color: ${ props => props.theme.primaryBackgroundColor };
  color: ${ props => props.theme.primaryFontColor };
`

const GameTitle = styled.h1`
  font-size: 10vmin;
  font-weight: bold;
  color: ${ props => props.theme.primaryFontColor };
`

const MenuButtonContainer = styled.div`
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-height: 10rem;
  padding: 1rem;
  * {
    margin: 0.5rem auto;
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    max-width: 50vw;
    margin: 0 auto;
    & > * {
      width: 20vw;
      margin: auto 1.5rem;
    }
  }
`

const MainMenuButton = styled(MenuButton)`
  background-color: ${props => props.theme.primaryButtonColor};
  color: ${props => props.theme.primaryButtonFontColor};
  border: 1px solid ${props => props.theme.primaryButtonColor};
  transition: all ease-in 0.125s;
  &:hover {
    background-color: ${props => props.theme.primaryButtonHoverColor};
  }
`

export default function MainMenuScreen (props) {
  const { onSwitchScreen } = props
  const { theme, gameOver, resetGame, word } = useGameState()
  const { gameLoading, gameStart, startGameStart, finishGameStart } = useFlags()

  const onStartGame = () => {
    startGameStart()
    window.setTimeout(finishGameStart, 1500)
    resetGame()
    
    onSwitchScreen('GameScreen')
  }

  const onResumeGame = () => {
    onSwitchScreen('GameScreen')
  }

  const onShowOptions = () => {
    onSwitchScreen('OptionsScreen')
  }

  const hasOngoingGame = !gameLoading && !gameOver && !!word
  // console.log(gameLoading)

  return (
    <MainMenuWrapper theme={theme}>
      <GameTitle theme={theme}>React Hangman</GameTitle>
      <MenuButtonContainer>
        { hasOngoingGame && <MainMenuButton theme={theme} onClick={onResumeGame}>Resume Game</MainMenuButton> }
        <MainMenuButton theme={theme} onClick={onStartGame}>New Game</MainMenuButton>
        <MainMenuButton theme={theme} onClick={onShowOptions}>Options</MainMenuButton>
      </MenuButtonContainer>
    </MainMenuWrapper>
  )
}