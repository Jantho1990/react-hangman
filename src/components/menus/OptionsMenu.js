import React from 'react'
import styled from 'styled-components'
import MenuDisplay from './MenuDisplay'
import MenuButton from '../buttons/MenuButton'
import MenuSelect from '../buttons/MenuSelect'
import MenuOption from '../buttons/MenuOption'

const OptionsMenuWrapper = styled.div`
  background-color: pink;
`

const SubmenuTheme = () => {
  return (
    <MenuSelect label={'Themes'}>
      <MenuOption>Light</MenuOption>
      <MenuOption>Dark</MenuOption>
    </MenuSelect>
  )
}

const SubmenuVolume = () => {
  return (
    <MenuButton>Volume</MenuButton>
  )
}

export default function OptionsMenu(props) {
  const { show, onCloseMenu, onRestartGame } = props

  const onChangeTheme = () => {
    console.log('trigger theme change')
  }

  return (
    <OptionsMenuWrapper>
      <h4>Options</h4>
      <SubmenuTheme/>
      <SubmenuVolume/>
    </OptionsMenuWrapper>
  )
}