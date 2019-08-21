import React from 'react'
import { useTransition, animated } from 'react-spring'

export default function ModalBackgroundAnimation({ children, paused }) {
  // Pause menu enter/leave animation.
  const pauseMenuTransition = useTransition(paused, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  const RenderPauseMenu = () => {
    return pauseMenuTransition.map(({item, key, props}) => {
      return (
        <animated.div key={key} style={{...props, position: 'fixed', height: '100%', width: '100%'}}>
          { item && children }
        </animated.div>
      )
    })
  }

  return (
    <RenderPauseMenu/>
  )
}