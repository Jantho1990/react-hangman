import React from 'react'
import GameScreenHeaderAnimation from 'screens/game-screen/game-screen-header/GameScreenHeaderAnimation'
import GameScreenHeaderWrapper from 'screens/game-screen/game-screen-header/GameScreenHeaderWrapper'

export default function GameScreenHeader({children, theme}) {
  return (
    <GameScreenHeaderAnimation style={{ gridArea: 'header' }}>
      <GameScreenHeaderWrapper theme={theme}>
        {children}
      </GameScreenHeaderWrapper>
    </GameScreenHeaderAnimation>
  )
}