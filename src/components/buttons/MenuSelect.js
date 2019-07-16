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
  const handleSubmit = event => {
    const value = event.target.value
    useGameState.changeTheme(value)
  }

  return (
    <MenuSelectWrapper onSubmit={handleSubmit}>
      <MenuSelectLabel>{props.label}</MenuSelectLabel>
      <Select {...props}></Select>
    </MenuSelectWrapper>
  )
}