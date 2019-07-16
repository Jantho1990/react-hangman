import React from 'react'
import styled from 'styled-components'

import MenuContainer from '../menus/MenuContainer'
import MenuButton from '../buttons/MenuButton'

import { theme as currentTheme } from '../../config.json'
import themes from '../../themes'

const theme = themes[currentTheme]

const MainMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: center;
  height: 100%;
`

const GameTitle = styled.h1`
  font-size: 10vmin;
  font-weight: bold;
`

const MenuButtonContainer = styled.div`
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-height: 10rem;
  padding: 1rem;
  * {
    margin: 0.5rem auto;
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    max-width: 50vw;
    margin: 0 auto;
    & > * {
      width: 20vw;
      margin: auto 1.5rem;
    }
  }
`

const MainMenuButton = styled(MenuButton)`
  background-color: ${theme.primaryButtonColor};
  color: ${theme.primaryButtonFontColor};
  border: 1px solid ${theme.primaryButtonColor};
  transition: all ease-in 0.125s;
  &:hover {
    background-color: ${theme.primaryButtonHoverColor};
  }
`

export default function MainMenuScreen (props) {
  const { onSwitchScreen } = props

  const onStartGame = () => {
    console.log('Starting game...')
    onSwitchScreen('GameScreen')
  }

  const onShowOptions = () => {
    console.log('Showing options...')
    onSwitchScreen('OptionsScreen')
  }

  return (
    <MainMenuWrapper>
      <GameTitle>React Hangman</GameTitle>
      <MenuButtonContainer>
        <MainMenuButton onClick={onStartGame}>Start</MainMenuButton>
        <MainMenuButton onClick={onShowOptions}>Options</MainMenuButton>
        <MainMenuButton>Quit</MainMenuButton>
      </MenuButtonContainer>
    </MainMenuWrapper>
  )
}