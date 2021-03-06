import React from 'react'
import useSound from 'sound-manager/useSound'
import styled from 'styled-components'
import useGameState from 'game-state/useGameState'

const Button = styled.button`
  border: none;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 300px;
  cursor: pointer;
  font-family: ${({ ui }) => ui}; /* System defaults somehow take precedence if you don't do this. */
  background-color: ${props => props.theme.primaryButtonColor};
  color: ${props => props.theme.primaryButtonFontColor};
  &:hover {
    background-color: ${props => props.theme.primaryButtonHoverColor};
    color: ${props => props.theme.primaryButtonFontHoverColor};
  }
`

export default function MenuButton (props) {
  const { onClick } = props
  const {
    theme,
    fonts: {
      ui
    }
  } = useGameState()

  const { play } = useSound()

  const handleClick = () => {
    onClick()
  }

  return <Button theme={theme} ui={ui} {...props} onClick={handleClick}>{props.children}</Button>
}