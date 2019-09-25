import React from 'react'
import styled from 'styled-components'
import useGameState from 'game-state/useGameState'

const Button = styled.button`
  border: none;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 300px;
  cursor: pointer;
  background-color: ${props => props.theme.primaryButtonColor};
  color: ${props => props.theme.primaryButtonFontColor};
  &:hover {
    background-color: ${props => props.theme.primaryButtonHoverColor};
    color: ${props => props.theme.primaryButtonFontHoverColor};
  }
`

export default function MenuButton (props) {
  const { theme } = useGameState()

  return <Button theme={theme} {...props} onClick={props.onClick}>{props.children}</Button>
}