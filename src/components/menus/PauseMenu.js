import React from 'react'
import styled from 'styled-components'
import MenuContainer from './MenuContainer'

export default function PauseMenu(props) {
  const { show, onCloseMenu } = props
  console.log(show)

  return (
    <MenuContainer
      className={show ? 'visible' : ''}
    >
      <h2>Paused</h2>
      <button>Restart</button>
      <button onClick={onCloseMenu}>Return to Game</button>
    </MenuContainer>
  )
}