import React, { useState } from 'react'
import styled from 'styled-components'

const MenuDisplayWrapper = styled.div`
  background-color: orange;
`

export default function MenuDisplay(props) {
  const [subMenuComponents, setSubMenuComponents] = useState(
    React.Children.map(props.children, Child => Child)
  )

  // Get the names of each child component.
  const [subMenuNames, setSubMenuNames] = useState(
    React.Children.map(props.children, child => child.type.name)
  )

  const [activeMenuName, setActiveMenuName] = useState(props.activeMenu || subMenuNames[0])

  const [activeMenu, setActiveMenu] = useState(
    getSubMenu(activeMenuName)
  )

  function getSubMenu(menuName) {
    return subMenuComponents.reduce((carry, subMenuComponent) => {
      return carry === undefined
        ? subMenuComponent.type.name === menuName
          ? subMenuComponent
          : carry
        : carry
    }, undefined)
  }

  /**
   * Set the active menu component.
   */
  function handleChangeActiveMenu(newMenuName) {
    const menuName = subMenuNames.reduce((carry, subMenuName) => {
      return carry === ''
        ? subMenuName === newMenuName
          ? subMenuName
          : ''
        : carry
    }, '')

    if (menuName === '') {
      throw new Error(`${newMenuName} is not a submenu of this MenuDisplay.`)
    }

    setActiveMenuName(menuName)
    setActiveMenu(getSubMenu(menuName))
  }

  /**
   * Renders the active menu. Doing it this way so we can add new props.
   */
  function renderActiveMenu() {
    return {
      ...activeMenu,
      props: {
        ...props,
        onChangeActiveMenu: handleChangeActiveMenu
      }
    }
  }
  
  return (
    <MenuDisplayWrapper>
      {renderActiveMenu()}
    </MenuDisplayWrapper>
  )
}