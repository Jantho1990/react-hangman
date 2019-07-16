import React from 'react'
import styled from 'styled-components'
import MenuDisplay from './MenuDisplay'
import MenuButton from '../buttons/MenuButton'
import MenuSelect from '../buttons/MenuSelect'
import MenuOption from '../buttons/MenuOption'
import useGameState from '../game-state/useGameState'

const OptionsMenuWrapper = styled.div`
  background-color: pink;
`

const SubmenuTheme = (props) => {
  return (
    <MenuSelect label={'Themes'} {...props}>
      <MenuOption value="light">Light</MenuOption>
      <MenuOption value="dark">Dark</MenuOption>
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
  const { changeTheme } = useGameState()

  const handleChangeTheme = (value) => {
    console.log('trigger theme change', value)
    changeTheme(value)
  }

  return (
    <OptionsMenuWrapper>
      <h4>Options</h4>
      <SubmenuTheme onsubmit={handleChangeTheme}/>
      <SubmenuVolume/>
    </OptionsMenuWrapper>
  )
}