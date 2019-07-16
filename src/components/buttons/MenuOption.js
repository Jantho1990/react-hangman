import React from 'react'
import styled from 'styled-components'

const Option = styled.option`
  background-color: orange;
`

export default function MenuOption (props) {
  return <Option {...props}></Option>
}