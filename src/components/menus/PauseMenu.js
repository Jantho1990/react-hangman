import React from 'react'
import styled from 'styled-components'
import MenuContainer from './MenuContainer'

export default function PauseMenu(props) {
  const { show, onCloseMenu, onRestartGame } = props
  console.log(show)

  const onRestart = () => {
    onRestartGame()
    onCloseMenu()
  }

  return (
    <MenuContainer
      className={show ? 'visible' : ''}
    >
      <h2>Paused</h2>
      <button onClick={onRestart}>Restart</button>
      <button onClick={onCloseMenu}>Return to Game</button>
    </MenuContainer>
  )
}