import React from 'react'
import styled from 'styled-components'

export default styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.gameScreen.headerBackgroundColor};
  font-size: calc(10px + 2vmin);
  color: ${props => props.theme.gameScreen.headerFontColor};
  flex: 1;
`