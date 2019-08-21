import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

const AppHeaderWrapper = styled.header`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.gameScreen.headerBackgroundColor};
  font-size: calc(10px + 2vmin);
  color: ${props => props.theme.gameScreen.headerFontColor};
  flex: 1;
`

export default function AppHeader({children, theme}) {
  // Slide in header and footer when entering GameScreen
  const springHeader = useSpring({
    from: { transform: 'translate3d(0, -100%, 0)' },
    to: { transform: 'translate3d(0, 0%, 0)' },
    delay: 550
  })

  return (
    <animated.div style={{...springHeader, gridArea: 'header'}}>
      <AppHeaderWrapper theme={theme}>
        {children}
      </AppHeaderWrapper>
    </animated.div>
  )
}