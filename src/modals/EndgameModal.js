import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import useGameState from 'game-state/useGameState'
import ModalWrapper from 'modals/ModalWrapper'
import EndgameView from 'views/EndgameView'

const ViewContainer = styled.div`
  height: 100%;
  width: 100%;
`

export default function EndgameModal({ show, onCloseMenu, onRestartGame, onSwitchScreen }) {
  const { theme } = useGameState()

  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 }
  })

  const renderCurrentMenu = () => {
    return (
      <animated.div style={{...spring, height: '100%', width: '100%', position: 'fixed'}}>
        <ViewContainer>
          <EndgameView
            onRestartGame={onRestartGame}
            onSwitchScreen={onSwitchScreen}
          />
        </ViewContainer>
      </animated.div>
    )
  }

  return (
    <ModalWrapper visible={show} theme={theme}>
      {renderCurrentMenu()}
    </ModalWrapper>
  )
}