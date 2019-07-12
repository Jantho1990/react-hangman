import React from 'react'
import styled from 'styled-components'
import MenuContainer from './MenuContainer'

export default function (props) {
  const { show } = props

  return (
    <MenuContainer
      classList={() => show ? 'visible' : ''}
    >
      <h2>Paused</h2>
      <button>Restart</button>
    </MenuContainer>
  )
}