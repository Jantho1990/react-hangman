import React, { useState } from 'react'
import ModalContainer from './ModalContainer'
import PauseMenu from '../menus/PauseMenu'
import OptionsMenu from '../menus/OptionsMenu'

export default function PauseModal({ show, onCloseMenu, onRestartGame, onSwitchScreen }) {

  const [ currentMenu, setCurrentMenu ] = useState('PauseMenu')

  const handleChangeCurrentMenu = newMenu => {
    setCurrentMenu(newMenu)
  }

  const renderCurrentMenu = () => {
    switch (currentMenu) {
      case 'PauseMenu':
        return (
          <PauseMenu
            onCloseMenu={onCloseMenu}
            onRestartGame={onRestartGame}
            onChangeActiveMenu={handleChangeCurrentMenu}
            onSwitchScreen={onSwitchScreen}
          />
        )
      case 'OptionsMenu':
        return <OptionsMenu onExitMenu={() => handleChangeCurrentMenu('PauseMenu')}/>
      default:
        throw new Error(`${currentMenu} could not be rendered.`)
    }
  }

  return (
    <ModalContainer visible={show}>
      {renderCurrentMenu()}
    </ModalContainer>
  )
}