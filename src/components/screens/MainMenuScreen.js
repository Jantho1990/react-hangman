import React from 'react'
import styled from 'styled-components'

import Button from '../buttons/MenuButton'

const Wrapper = styled.div`
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
    <Wrapper>
      <GameTitle>React Hangman</GameTitle>
      <Button onClick={onStartGame}>Start</Button>
      <Button>Options</Button>
      <Button>Quit</Button>
    </Wrapper>
  )
}