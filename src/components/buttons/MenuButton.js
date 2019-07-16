import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  border: none;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  width: 100%;
  cursor: pointer;
`

export default function MenuButton (props) {
  return <Button {...props} onClick={props.onClick}>{props.children}</Button>
}