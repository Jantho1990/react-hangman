import React from 'react'
import styled from 'styled-components'

import config from '../../config.json'

export default styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${config.menuBackgroundColor || 'hsl(0, 0%, 50%)'};
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  &.visible {
    display: block;
  }
`