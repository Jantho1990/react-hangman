import React from 'react'
import styled from 'styled-components'

import config from '../../config.json'

const ModalContainerWrapper = styled.div`
  background-color: ${config.menuBackgroundColor || 'hsla(0, 0%, 50%, 95%)'};
  display: none;
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  &.visible {
    display: flex;
  }
`

export default function ModalContainer(props) {
  
  return (
    <ModalContainerWrapper>
      {props.children}
    </ModalContainerWrapper>
  )
}