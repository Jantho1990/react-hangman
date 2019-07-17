import React from 'react'
import styled from 'styled-components'

import MenuButton from '../buttons/MenuButton'
import MenuDisplay from '../menus/MenuDisplay'
import OptionsMenu from '../menus/OptionsMenu'

const OptionsScreenWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: red;
`

export default function OptionsScreen(props) {
  const { onSwitchScreen } = props

  const onBackClick = () => {
    onSwitchScreen('MainMenuScreen')
  }

  return (
    <OptionsScreenWrapper>
      <OptionsMenu onExitMenu={onBackClick}/>
    </OptionsScreenWrapper>
  )
}