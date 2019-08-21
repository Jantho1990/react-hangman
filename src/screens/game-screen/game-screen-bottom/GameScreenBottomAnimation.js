import React from 'react'
import { useSpring, animated } from 'react-spring'

export default function GameScreenBottomAnimation({children}) {
  const springFooter = useSpring({
    from: { transform: 'translate3d(0, 500%, 0)' },
    to: { transform: 'translate3d(0, 0%, 0)' },
    delay: 550
  })

  return (
    <animated.div style={{ ...springFooter }}>
      {children}
    </animated.div>
  )
}