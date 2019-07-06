import React, { Component } from 'react'

export default class LetterSelector extends Component {
  constructor() {
    super()

    this.letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  }

  render() {
    const { letters } = this

    let renderLetterButtons = () => {
      return <ul className="letter-list">
        { letters.map((letter, i) => {
          return <li className="letter" onClick={() => alert(letter)}>{letter}</li>
        }) }
      </ul>
    }

    return (
      <div className="letter-selector">
        { renderLetterButtons() }
      </div>
    )
  }
}
