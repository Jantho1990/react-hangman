import React from 'react'
import styled from 'styled-components'
import useGameState from 'game-state/useGameState'
import useSound from 'sound-manager/useSound'
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
  font-family: ${({ titleDisplay }) => titleDisplay};
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
  @media screen and (min-width: 768px) {
      & > * {
          margin: 0.5rem;
      }
  }
`

export default function PauseMenu({ onChangeActiveMenu, onCloseMenu, onRestartGame, onSwitchScreen }) {
  const {
    theme,
    fonts: {
      titleDisplay
    }
  } = useGameState()

  const { play } = useSound()

  const onOptions = () => {
    play('MenuTransition')

    onChangeActiveMenu('OptionsMenu')
  }

  const onQuit = () => {
    play('MenuTransition')

    onSwitchScreen('MainMenuScreen')
  }

  const onRestart = () => {
    onRestartGame()
    onCloseMenu()
  }

  return (
    <PauseMenuWrapper theme={theme}>
      <PauseMenuTitle theme={theme} titleDisplay={titleDisplay}>Paused</PauseMenuTitle>
      <PauseMenuScroll>
        <PauseMenuButton theme={theme} onClick={onRestart}>Restart</PauseMenuButton>
        <PauseMenuButton theme={theme} onClick={onOptions}>Options</PauseMenuButton>
        <PauseMenuButton theme={theme} onClick={onQuit}>Quit</PauseMenuButton>
        <PauseMenuButton theme={theme} onClick={onCloseMenu}>Return to Game</PauseMenuButton>
      </PauseMenuScroll>
    </PauseMenuWrapper>
  )
}