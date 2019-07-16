import React from 'react'
import styled from 'styled-components'
import MenuContainer from './MenuContainer'
import MenuButton from '../buttons/MenuButton'

export default function OptionsMenu(props) {
  const { show, onCloseMenu, onRestartGame } = props

  const onQuit = () => {
    const { onSwitchScreen } = props
    onSwitchScreen('MainMenuScreen')
  }

  const onRestart = () => {
    onRestartGame()
    onCloseMenu()
  }

  return (
    <MenuContainer
      className={show ? 'visible' : ''}
    >
      <h2>Paused</h2>
      <MenuButton onClick={onRestart}>Restart</MenuButton>
      <MenuButton onClick={onQuit}>Quit</MenuButton>
      <MenuButton onClick={onCloseMenu}>Return to Game</MenuButton>
    </MenuContainer>
  )
}