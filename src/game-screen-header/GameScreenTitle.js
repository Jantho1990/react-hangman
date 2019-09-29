import React from 'react'
import styled from 'styled-components'
import useGameState from 'game-state/useGameState'

const GameScreenTitleStyles = styled.h1`
  font-size: 1.5rem;
  margin-left: 1rem;
  font-family: ${({ title }) => title};
`

export default function GameScreenTitle({ children }) {
  const {
    fonts: {
      title
    }
  } = useGameState()

  return (
    <GameScreenTitleStyles title={title}>
      { children }
    </GameScreenTitleStyles>
  )
}