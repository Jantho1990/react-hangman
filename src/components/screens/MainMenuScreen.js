import React from 'react'
import styled from 'styled-components'

import MenuButton from '../buttons/MenuButton'

const MainMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: space-around;
`

const GameTitle = styled.h1`
  font-size: 10vmin;
  font-weight: bold;
`

export default function MainMenuScreen (props) {
  const { onSwitchScreen } = props

  const onStartGame = () => {
    console.log('Starting game...')
    onSwitchScreen('GameScreen')
  }

  return (
    <MainMenuWrapper>
      <GameTitle>React Hangman</GameTitle>
      <MenuButton onClick={onStartGame}>Start</MenuButton>
      <MenuButton>Options</MenuButton>
      <MenuButton>Quit</MenuButton>
    </MainMenuWrapper>
  )
}