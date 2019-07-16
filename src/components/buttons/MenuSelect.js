import React from 'react'
import styled from 'styled-components'

const MenuSelectWrapper = styled.div`
  color: white;
`

const MenuSelectLabel = styled.span`
  font-weight: bold;
`

const Select = styled.select`
  background-color: green;
`

export default function MenuSelect(props) {
  return (
    <MenuSelectWrapper>
      <MenuSelectLabel>{props.label}</MenuSelectLabel>
      <Select {...props}></Select>
    </MenuSelectWrapper>
  )
}