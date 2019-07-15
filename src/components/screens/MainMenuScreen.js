import React from 'react'
import styled from 'styled-components'

import Button from '../buttons/MenuButton'

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
    <div>
      <GameTitle>React Hangman</GameTitle>
      <Button onClick={onStartGame}>Start</Button>
      <Button>Options</Button>
      <Button>Quit</Button>
    </div>
  )
}