import React, { useState } from 'react'
import styled from 'styled-components'
import ModalContainer from './ModalContainer'
import MenuDisplay from '../menus/MenuDisplay'
import PauseMenu from '../menus/PauseMenu'
import OptionsMenu from '../menus/OptionsMenu'
import MenuButton from '../buttons/MenuButton'

export default function PauseModal(props) {
  const { show, onCloseMenu, onRestartGame } = props
  
  return (
    <ModalContainer
      visible={show}
    >
      <MenuDisplay activeMenu="PauseMenu" {...props}>
        <PauseMenu onCloseMenu={onCloseMenu} onRestartGame={onRestartGame}/>
        <OptionsMenu onExitMenu={props.onChangeActiveMenu}/>
      </MenuDisplay>
    </ModalContainer>
  )
}