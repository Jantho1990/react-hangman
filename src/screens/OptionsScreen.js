import React from 'react'
import styled from 'styled-components'
import useGameState from 'game-state/useGameState'
import OptionsMenu from 'menus/OptionsMenu'

const OptionsScreenWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.primaryBackgroundColor};
`

export default function OptionsScreen(props) {
  const { onSwitchScreen } = props

  const { theme } = useGameState()

  const onBackClick = () => {
    onSwitchScreen('MainMenuScreen')
  }

  return (
    <OptionsScreenWrapper theme={theme}>
      <OptionsMenu onExitMenu={onBackClick}/>
    </OptionsScreenWrapper>
  )
}