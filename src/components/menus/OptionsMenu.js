import React from 'react'
import styled from 'styled-components'
import MenuContainer from './MenuContainer'
import MenuButton from '../buttons/MenuButton'
import MenuSelect from '../buttons/MenuSelect'
import MenuOption from '../buttons/MenuOption'
import MenuRange from '../buttons/MenuRange'
import useGameState from '../../game-state/useGameState'
import useSound from '../../sound-manager/useSound'

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

const SubmenuWrapper = ({ title, theme, children }) => {
  const Wrapper = styled.div`
    text-align: left;
    & > :nth-child(n + 2) {
      margin-left: 1rem;
      padding: 0;
      font-size: 0.85em;
      & > label {
        font-weight: normal;
        font-style: italic;
      }
    }
  `

  const Title = styled.span`
    color: ${props => props.theme.primaryFontColor};
    font-weight: bold;
    margin-bottom: 0.25rem;
    display: inline-block;
    &::after {
      content: ':';
    }
  `

  return (
    <Wrapper theme={theme}>
      <Title theme={theme}>{title}</Title>
      {children}
    </Wrapper>
  )
}

const SubmenuVolume = props => {
  const {
    master: { volume: masterVolume },
    changeMasterVolume,
    channels: {
      music: { volume: musicVolume },
      sfx: { volume: sfxVolume }
    },
    changeChannelVolume
  } = useSound()

  const handleChangeMasterVolume = value => {
    changeMasterVolume(value)
  }
  
  const handleChangeChannelVolume = (channel, value) => {
    changeChannelVolume(channel, value)
  }

  return (
    <SubmenuWrapper title="Volume" {...props}>
      <MenuRange label="Master" onsubmit={handleChangeMasterVolume} currentValue={masterVolume} min={0} max={1} step={0.01}/>
      <MenuRange label="Music" onsubmit={value => handleChangeChannelVolume('music', value)} currentValue={musicVolume} min={0} max={1} step={0.01}/>
      <MenuRange label="Sound Effects" onsubmit={value => handleChangeChannelVolume('sfx', value)} currentValue={sfxVolume} min={0} max={1} step={0.01}/>
    </SubmenuWrapper>
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
        <SubmenuVolume theme={theme}/>
        <MenuButton onClick={handleClickBack}>Back</MenuButton>
      </OptionsMenuScroll>
    </OptionsMenuWrapper>
  )
}