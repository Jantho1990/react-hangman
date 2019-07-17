import React from 'react'
import styled from 'styled-components'

import useGameState from '../game-state/useGameState'

const MenuSelectWrapper = styled.form`
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

const MenuSelectLabel = styled.label`
  font-weight: bold;
  ::after {
    content: ':';
  }
`

const Select = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  appearance: none;
  user-select: none;
  outline: 0;
  background-color: ${props => props.theme.primaryButtonColor};
  color: ${props => props.theme.primaryButtonFontColor};
  ::-moz-focus-inner {border: none}
  :-moz-focusring { color: transparent; text-shadow: 0px 0px 0px ${props => props.theme.primaryButtonFontColor};}
  & > option {
    color: inherit;
    background-color: inherit;
  }
`

const SelectWrapper = styled.div`
  width: 25vw;
  position: relative;
  border: 1px solid ${props => props.theme.primaryButtonColor};
  border-radius: 3px;
  background-color: ${props => props.theme.primaryButtonColor};
  color: ${props => props.theme.primaryButtonFontColor};
  ::after {
    content: '▼';
    width: 1rem;
    height: 1rem;
    display: block;
    background-color: transparent;
    position: absolute;
    right: 0%;
    top: 0;
    pointer-events: none;
    color: ${props => props.theme.primaryButtonFontColor};
  }
`

export default function MenuSelect(props) {
  const { label, onsubmit, currentValue } = props

  const { theme } = useGameState()

  const handleSubmit = event => {
    const value = event.target.value
    onsubmit(value)
  }

  return (
    <MenuSelectWrapper theme={theme} onChange={handleSubmit}>
      <MenuSelectLabel>{label}</MenuSelectLabel>
      <SelectWrapper theme={theme}>
        <Select theme={theme} {...props} defaultValue={currentValue}></Select>
      </SelectWrapper>
    </MenuSelectWrapper>
  )
}