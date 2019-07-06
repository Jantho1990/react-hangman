import React, { Component } from 'react'

export default class WordDisplay extends Component {
  static defaultProps = {
    word: 'testing'
  }

  render() {
    const { word } = this.props
    
    return (
      <div>{word}</div>
    )
  }
}