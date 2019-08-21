import React from 'react'
import GameScreenBottomWrapper from 'screens/game-screen/game-screen-bottom/GameScreenBottomWrapper'
import GameScreenBottomAnimation from 'screens/game-screen/game-screen-bottom/GameScreenBottomAnimation'

export default function GameScreenBottom({children}) {
  return (
    <GameScreenBottomAnimation style={{ gridArea: 'footer', overflow: 'hidden' }}>
      <GameScreenBottomWrapper>
        { children }
      </GameScreenBottomWrapper>
    </GameScreenBottomAnimation>
  )
}