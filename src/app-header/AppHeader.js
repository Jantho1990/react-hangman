import React from 'react'
import AppHeaderAnimation from 'app-header/AppHeaderAnimation'
import AppHeaderWrapper from 'app-header/AppHeaderWrapper'

export default function AppHeader({children, theme}) {
  return (
    <AppHeaderAnimation style={{ gridArea: 'header' }}>
      <AppHeaderWrapper theme={theme}>
        {children}
      </AppHeaderWrapper>
    </AppHeaderAnimation>
  )
}