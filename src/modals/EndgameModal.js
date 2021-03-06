import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import ModalWrapper from 'modals/ModalWrapper'
import EndgameView from 'views/EndgameView'

const ViewContainer = styled.div`
  ${'' /* height: 50vh; */}
  height: 100%;
  width: 100%;
`

export default function EndgameModal({ show, onCloseMenu, onRestartGame, onSwitchScreen }) {
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

  /* const pauseMenuTransition = useTransition(null, null, {
    from: { transform: 'translate3d(0, -100%, 0)' },
    enter: { transform: 'translate3d(0, 0%, 0)' },
    leave: { transform: 'translate3d(0, -100%, 0)' }
  }) */

  return (
    <ModalWrapper visible={show}>
      {renderCurrentMenu()}
    </ModalWrapper>
  )
}