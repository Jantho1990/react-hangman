import React, { useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import ModalContainer from './ModalContainer'
import EndgameView from '../views/EndgameView'

const ViewContainer = styled.div`
  height: 50vh;
`

export default function PauseModal({ show, onCloseMenu, onRestartGame, onSwitchScreen }) {
  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 }
  })

  const renderCurrentMenu = () => {
    return (
      <animated.div style={{...spring, height: '100%', width: '100%', position: 'fixed'}}>
        <ViewContainer>
          <EndgameView/>
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
    <ModalContainer visible={show}>
      {renderCurrentMenu()}
    </ModalContainer>
  )
}