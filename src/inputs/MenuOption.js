import React from 'react'
import styled from 'styled-components'
import useGameState from 'game-state/useGameState'

const Option = styled.option`
  background-color: orange;
  font-family: ${({ ui }) => ui}; /* System defaults somehow take precedence if you don't do this. */
`

export default function MenuOption (props) {
  const {
    fonts: {
      ui
    }
  } = useGameState()

  return <Option ui={ui} {...props}></Option>
}