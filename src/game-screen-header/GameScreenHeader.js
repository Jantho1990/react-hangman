import React from 'react'
import GameScreenHeaderAnimation from 'game-screen-header/GameScreenHeaderAnimation'
import GameScreenHeaderWrapper from 'game-screen-header/GameScreenHeaderWrapper'

export default function GameScreenHeader({children, theme}) {
  return (
    <GameScreenHeaderAnimation style={{ gridArea: 'header' }}>
      <GameScreenHeaderWrapper theme={theme}>
        {children}
      </GameScreenHeaderWrapper>
    </GameScreenHeaderAnimation>
  )
}