import React from 'react'
import { useSpring, animated } from 'react-spring'

export default function AppHeaderAnimation({ children }) {
  // Slide in header and footer when entering GameScreen
  const springHeader = useSpring({
    from: { transform: 'translate3d(0, -100%, 0)' },
    to: { transform: 'translate3d(0, 0%, 0)' },
    delay: 550
  })

  return (
    <animated.div style={{ ...springHeader }}>
      {children}
    </animated.div>
  )
}