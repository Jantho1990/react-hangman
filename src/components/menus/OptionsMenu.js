import React from 'react'
import styled from 'styled-components'
import MenuContainer from './MenuContainer'
import MenuButton from '../buttons/MenuButton'
import MenuSelect from '../buttons/MenuSelect'
import MenuOption from '../buttons/MenuOption'

export default function OptionsMenu(props) {
  const { show, onCloseMenu, onRestartGame } = props

  const onChangeTheme = () => {
    console.log('trigger theme change')
  }

  return (
    <MenuContainer
      className={show ? 'visible' : ''}
    >
      <h2>Paused</h2>
      <MenuSelect label={'Themes'}>
        <MenuOption>Light</MenuOption>
        <MenuOption>Dark</MenuOption>
      </MenuSelect>
    </MenuContainer>
  )
}