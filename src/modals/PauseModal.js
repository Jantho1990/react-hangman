import React, { useState } from 'react'
import { useTransition, animated } from 'react-spring'
import useSound from 'sound-manager/useSound'
import ModalWrapper from 'modals/ModalWrapper'
import PauseMenu from 'menus/PauseMenu'
import OptionsMenu from 'menus/OptionsMenu'

export default function PauseModal({ show, onCloseMenu, onRestartGame, onSwitchScreen }) {
  const { play } = useSound()

  const [ currentMenu, setCurrentMenu ] = useState('PauseMenu')

  const handleChangeCurrentMenu = newMenu => {
    setCurrentMenu(newMenu)
  }

  const handleExitOptionsMenu = () => {
    play('MenuTransition')

    handleChangeCurrentMenu('PauseMenu')
  }

  const menus = {
    PauseMenu: <PauseMenu onCloseMenu={onCloseMenu} onRestartGame={onRestartGame} onChangeActiveMenu={handleChangeCurrentMenu} onSwitchScreen={onSwitchScreen}/>,
    OptionsMenu: <OptionsMenu onExitMenu={handleExitOptionsMenu}/>
  }

  const transitionConfig = currentMenu !== 'PauseMenu'
    ? {
        from: { transform: 'translate3d(100%, 0, 0)' },
        enter: { transform: 'translate3d(0%, 0, 0)' },
        leave: { transform: 'translate3d(-100%, 0, 0)' }
      }
    : {
        from: { transform: 'translate3d(-100%, 0, 0)' },
        enter: { transform: 'translate3d(0%, 0, 0)' },
        leave: { transform: 'translate3d(100%, 0, 0)' }
      }

  const menuTransitions = useTransition(currentMenu, item => item, transitionConfig)

  const renderCurrentMenu = () => {
    return menuTransitions.map(({item, key, props}) => {
      return (
        <animated.div key={key} style={{...props, height: '100%', width: '100%', position: 'fixed'}}>
          {menus[item]}
        </animated.div>
      )
    })
  }

  return (
    <ModalWrapper visible={show}>
      {renderCurrentMenu()}
    </ModalWrapper>
  )
}