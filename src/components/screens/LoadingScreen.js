import React from 'react'
import styled from 'styled-components'
import useAssets from '../../assets/useAssets'
import useGameState from '../../game-state/useGameState'

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

let loaded = false
let loading = false

export default function LoadingScreen({ onSwitchScreen }) {
  const { onReady } = useAssets()
  const { resetGame } = useGameState()

  if (!loaded && !loading) {
    loading = true
    onReady(() => {
      onSwitchScreen('MainMenuScreen')
    })
  }

  return (
    <LoadingScreenWrapper>
      <LoadingScreenText>
        Loading game...if this takes more than a few seconds, try reloading the app.
      </LoadingScreenText>
    </LoadingScreenWrapper>
  )
}
