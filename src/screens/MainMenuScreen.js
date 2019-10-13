import React from 'react'
import styled from 'styled-components'
import MenuButton from 'inputs/MenuButton'
import useGameState from 'game-state/useGameState'
import useSound from 'sound-manager/useSound'
import useFlags from 'flags/useFlags'

const MainMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: center;
  height: 100%;
  background-color: ${ ({ theme }) => theme.primaryBackgroundColor };
  color: ${ ({ theme }) => theme.primaryFontColor };
`

const GameTitle = styled.h1`
  font-size: 10vmin;
  font-weight: bold;
  color: ${ ({ theme }) => theme.primaryFontColor };
  font-family: ${({ titleDisplay }) => titleDisplay};
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
    margin: 0 auto;
    & > * {
      width: 20vw;
      margin: auto 1.5rem;
    }
  }
`

const MainMenuButton = styled(MenuButton)`
  background-color: ${({ theme }) => theme.primaryButtonColor};
  color: ${({ theme }) => theme.primaryButtonFontColor};
  border: 1px solid ${({ theme }) => theme.primaryButtonColor};
  transition: all ease-in 0.125s;
  &:hover {
    background-color: ${({ theme }) => theme.primaryButtonHoverColor};
  }
`

export default function MainMenuScreen (props) {
  const { onSwitchScreen } = props
  const {
    theme,
    gameOver,
    resetGame,
    fonts: {
      titleDisplay
    }
  } = useGameState()
  const { gameLoading, isFirstLoad, firstLoadFinished, isOngoingGame, setIsOngoingGame } = useFlags()
  const { play } = useSound()

  if (isFirstLoad && !gameOver) {
    setIsOngoingGame(true)
  }

  const onStartGame = () => {
    if (!isOngoingGame) {
      window.setTimeout(() => setIsOngoingGame(true), 1500)
    }

    if (isFirstLoad) firstLoadFinished()

    resetGame()

    play('MenuTransition')
  
    onSwitchScreen('GameScreen')
  }

  const onResumeGame = () => {
    play('MenuTransition')
    
    onSwitchScreen('GameScreen')
  }

  const onShowOptions = () => {
    play('MenuTransition')

    onSwitchScreen('OptionsScreen')
  }

  return (
    <MainMenuWrapper theme={theme}>
      <GameTitle theme={theme} titleDisplay={titleDisplay}>React Hangman</GameTitle>
      <MenuButtonContainer>
        { isOngoingGame && <MainMenuButton theme={theme} onClick={onResumeGame}>Resume Game</MainMenuButton> }
        <MainMenuButton theme={theme} onClick={onStartGame}>New Game</MainMenuButton>
        <MainMenuButton theme={theme} onClick={onShowOptions}>Options</MainMenuButton>
      </MenuButtonContainer>
    </MainMenuWrapper>
  )
}