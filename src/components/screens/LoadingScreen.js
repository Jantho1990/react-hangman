import React from 'react'
import styled from 'styled-components'

const LoadingScreenWrapper = styled.div`
  background-color: ${ props => props.theme.primaryBackgroundColor };
  color: ${ props => props.theme.primaryFontColor };
  width: 100vw;
  height: 100vh;
`

const LoadingScreenText = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default function LoadingScreen() {
  return (
    <LoadingScreenWrapper>
      <LoadingScreenText>
        Loading game...if this takes more than a few seconds, try reloading the app.
      </LoadingScreenText>
    </LoadingScreenWrapper>
  )
}
