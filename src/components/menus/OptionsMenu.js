import React from 'react'
import styled from 'styled-components'
import MenuContainer from './MenuContainer'
import MenuButton from '../buttons/MenuButton'
import MenuSelect from '../buttons/MenuSelect'
import MenuOption from '../buttons/MenuOption'
import useGameState from '../../game-state/useGameState'

const OptionsMenuWrapper = styled(MenuContainer)`
  width: 85%;
  max-height: 75%;
  background-color: ${props => props.theme.primaryBackgroundColor};
  & > * {
    margin: 0.5rem 0;
  }
`

const OptionsMenuTitle = styled.h2`
  color: ${props => props.theme.primaryFontColor};
  font-size: 20vmin;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`

const OptionsMenuScroll = styled.div`
  overflow-y: auto;
  width: 100%;
  & > * {
    margin: 0.5rem 0;
  }
`

const SubmenuTheme = (props) => {
  return (
    <MenuSelect label={'Theme'} {...props}>
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

export default function OptionsMenu({ onExitMenu }) {
  const { theme, changeTheme } = useGameState()

  const handleChangeTheme = (value) => {
    changeTheme(value)
  }

  const handleClickBack = () => {
    onExitMenu()
  }

  return (
    <OptionsMenuWrapper theme={theme}>
      <OptionsMenuTitle theme={theme}>Options</OptionsMenuTitle>
      <OptionsMenuScroll handleChangeTheme={handleChangeTheme}>
        <SubmenuTheme onsubmit={handleChangeTheme} currentValue={theme.name}/>
        <SubmenuVolume/>
        <MenuButton onClick={handleClickBack}>Back</MenuButton>
      </OptionsMenuScroll>
    </OptionsMenuWrapper>
  )
}