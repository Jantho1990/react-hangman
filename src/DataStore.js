import React, { Component } from 'react'
import config from 'config.json'
import themes from 'themes'

const DataContext = React.createContext()

export function DataConsumer(props) {
  return (
    <DataContext.Consumer>
      {data => props.children}
    </DataContext.Consumer>
  )
}

export default class DataStore extends Component {
  constructor(props) {
    super(props)

    this.state = {
      themeName: config.theme
    }
  }

  handleUpdateTheme = (theme) => {
    this.setState(state => ({
      ...state,
      theme
    }))
  }

  getCurrentTheme = (theme) => {
    return themes[theme]
  }

  render () {
    return (
      <DataContext.Provider
        value={{
          themeName: this.state.themeName,
          theme: this.getCurrentTheme(this.state.themeName),
          onUpdateTheme: this.handleUpdateTheme
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    )
  }
}