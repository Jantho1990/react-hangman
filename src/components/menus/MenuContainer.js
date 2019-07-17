import React from 'react'
import styled from 'styled-components'

import config from '../../config.json'

export default styled.div`
  ${'' /* background-color: ${config.menuBackgroundColor || 'hsla(0, 0%, 50%, 95%)'}; */}
  display: flex;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 30rem;
  }
`