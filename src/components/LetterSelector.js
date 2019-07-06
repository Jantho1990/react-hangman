import React, { Component } from 'react'
import styled from 'styled-components'

const LetterWrapper = styled.div`
  background-color: red;
  max-width: 50rem;
  margin: auto;
`

const ListContainer = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 1.5rem;
  list-style: none;
  text-transform: capitalize;
`

const ListItem = styled.li`
  cursor: pointer;
  color: white;
  margin: 1em;
`

export default class LetterSelector extends Component {
  constructor() {
    super()

    this.letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  }

  render() {
    const { letters } = this

    let renderLetterButtons = () => {
      return (
        <ListContainer>
          {letters.map((letter, i) => {
            return (
              <ListItem className="letter" onClick={() => alert(letter)}>
                {letter}
              </ListItem>
            )
          })}
        </ListContainer>
      )
    }

    return <LetterWrapper>{renderLetterButtons()}</LetterWrapper>
  }
}
