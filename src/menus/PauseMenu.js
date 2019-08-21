import React from 'react'
import styled from 'styled-components'
import useGameState from 'game-state/useGameState'
import MenuWrapper from 'menus/MenuWrapper'
import MenuButton from 'inputs/MenuButton'

const PauseMenuWrapper = styled(MenuWrapper)`
  width: 85%;
  max-height: 75%;
  background-color: ${props => props.theme.primaryBackgroundColor};
  & > * {
    margin: 0.5rem 0;
  }
`

const PauseMenuButton = styled(MenuButton)`
  background-color: ${props => props.theme.primaryButtonColor};
  color: ${props => props.theme.primaryButtonFontColor};
  &:hover {
    background-color: ${props => props.theme.primaryButtonHoverColor};
    color: ${props => props.theme.primaryButtonFontHoverColor};
  }
`

const PauseMenuTitle = styled.h2`
  color: ${props => props.theme.primaryFontColor};
  font-size: 20vmin;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`

const PauseMenuScroll = styled.div`
  overflow-y: auto;
  width: 100%;
  & > * {
    margin: 0.5rem 0;
  }
`

export default function PauseMenu({ onChangeActiveMenu, onCloseMenu, onRestartGame, onSwitchScreen }) {
  const { theme } = useGameState()

  const onOptions = () => {
    onChangeActiveMenu('OptionsMenu')
  }

  const onQuit = () => {
    onSwitchScreen('MainMenuScreen')
  }

  const onRestart = () => {
    onRestartGame()
    onCloseMenu()
  }

  return (
    <PauseMenuWrapper theme={theme}>
      <PauseMenuTitle theme={theme}>Paused</PauseMenuTitle>
      <PauseMenuScroll>
        <PauseMenuButton theme={theme} onClick={onRestart}>Restart</PauseMenuButton>
        <PauseMenuButton theme={theme} onClick={onOptions}>Options</PauseMenuButton>
        <PauseMenuButton theme={theme} onClick={onQuit}>Quit</PauseMenuButton>
        <PauseMenuButton theme={theme} onClick={onCloseMenu}>Return to Game</PauseMenuButton>
      </PauseMenuScroll>
    </PauseMenuWrapper>
  )
}