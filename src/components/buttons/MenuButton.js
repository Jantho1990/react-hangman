import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  border: none;
  border-radius: 3px;
  padding: 0.5rem 1rem;
`

export default function MenuButton (props) {
  return <Button onClick={props.onClick}>{props.children}</Button>
}