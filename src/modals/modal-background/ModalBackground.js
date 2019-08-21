import React from 'react'
import ModalBackgroundAnimation from 'modals/modal-background/ModalBackgroundAnimation'

export default function ModalBackground({ children, paused }) {
  return (
    <ModalBackgroundAnimation paused={paused} style={{ position: 'fixed', height: '100%', width: '100%' }}>
      { children }
    </ModalBackgroundAnimation>
  )
}