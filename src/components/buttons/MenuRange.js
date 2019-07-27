import React from 'react'
import styled from 'styled-components'
import useGameState from '../../game-state/useGameState'

const MenuRangeWrapper = styled.form`
  color: ${props => props.theme.primaryFontColor};
  ${'' /* border: 1px solid ${props => props.theme.primaryButtonColor}; */}
  border-radius: 3px;
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Range = styled.input`
  border: none;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  width: 100%;
  cursor: pointer;
  background-color: ${props => props.theme.primaryButtonColor};
  color: ${props => props.theme.primaryButtonFontColor};
  &:hover {
    background-color: ${props => props.theme.primaryButtonHoverColor};
    color: ${props => props.theme.primaryButtonFontHoverColor};
  }
`

const MenuRangeLabel = styled.label`
  font-weight: bold;
  ::after {
    content: ':';
  }
`

export default function MenuRange (props) {
  const { theme } = useGameState()
  const { label = null, onsubmit } = props

  const handleSubmit = event => {
    const value = event.target.value
    onsubmit(value)
  }

  return (
    <MenuRangeWrapper theme={theme} onChange={handleSubmit}>
      <MenuRangeLabel theme={theme}>{label}</MenuRangeLabel>
      <Range type="range" defaultValue={1} theme={theme} {...props} onClick={props.onClick}>{props.children}</Range>
    </MenuRangeWrapper>
  ) 
}