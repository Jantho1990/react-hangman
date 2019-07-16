import React from 'react'
import styled from 'styled-components'

import useGameState from '../game-state/useGameState'

const MenuSelectWrapper = styled.form`
  color: white;
`

const MenuSelectLabel = styled.span`
  font-weight: bold;
`

const Select = styled.select`
  background-color: green;
`

export default function MenuSelect(props) {
  const { onsubmit, currentValue } = props

  const handleSubmit = event => {
    const value = event.target.value
    onsubmit(value)
  }

  return (
    <MenuSelectWrapper onChange={handleSubmit}>
      <MenuSelectLabel>{props.label}</MenuSelectLabel>
      <Select {...props} defaultValue={currentValue}></Select>
    </MenuSelectWrapper>
  )
}