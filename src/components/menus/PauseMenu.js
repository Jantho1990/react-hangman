import React from 'react'
import styled from 'styled-components'
import useGameState from '../game-state/useGameState'
import MenuContainer from './MenuContainer'
import MenuButton from '../buttons/MenuButton'

const PauseMenuWrapper = styled(MenuContainer)`
  width: 85%;
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
  font-size: 20vw;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`

export default function PauseMenu(props) {
  const { onChangeActiveMenu, onCloseMenu, onRestartGame } = props

  const { theme } = useGameState()

  const onOptions = () => {
    onChangeActiveMenu('OptionsMenu')
  }

  const onQuit = () => {
    const { onSwitchScreen } = props
    onSwitchScreen('MainMenuScreen')
  }

  const onRestart = () => {
    onRestartGame()
    onCloseMenu()
  }

  return (
    <PauseMenuWrapper theme={theme} {...props}>
      <PauseMenuTitle theme={theme}>Paused</PauseMenuTitle>
      <PauseMenuButton theme={theme} onClick={onRestart}>Restart</PauseMenuButton>
      <PauseMenuButton theme={theme} onClick={onOptions}>Options</PauseMenuButton>
      <PauseMenuButton theme={theme} onClick={onQuit}>Quit</PauseMenuButton>
      <PauseMenuButton theme={theme} onClick={onCloseMenu}>Return to Game</PauseMenuButton>
    </PauseMenuWrapper>
  )
}