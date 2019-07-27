import React, { Component } from 'react'
import styled from 'styled-components'
import useGameState from '../../game-state/useGameState'

const MenuRangeWrapper = styled.form`
  color: ${props => props.theme.primaryFontColor};
  ${'' /* border: 1px solid ${props => props.theme.primaryButtonColor}; */}
  border-radius: 3px;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Range = styled.input`
  border: none;
  border-radius: 3px;
  padding: 0.5rem 0;
  cursor: pointer;
  background-color: ${props => props.theme.primaryButtonColor};
  color: ${props => props.theme.primaryButtonFontColor};
  outline: none;
  &:hover {
    background-color: ${props => props.theme.primaryButtonHoverColor};
    color: ${props => props.theme.primaryButtonFontHoverColor};
  }
  &:focus, &::-moz-focus-outer{
    outline: none;
    border: 0;
  }
`

const MenuRangeLabel = styled.label`
  font-weight: bold;
  ::after {
    content: ':';
  }
`

export default class MenuRange extends Component {
  constructor (props) {
    super(props)
    const { label = null, onsubmit, defaultValue = 1 } = props
    this.state = {
      label,
      onsubmit,
      currentValue: defaultValue()
    }

    this.inputEl = React.createRef()
  }

  handleSubmit = event => {
    const { onsubmit } = this.state

    const value = Number(event.target.value)
    onsubmit(value)

    this.setState({
      ...this.state,
      currentValue: value
    })
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { inputEl: { value }, props: { theme }} = this
    const { theme: nextTheme, currentValue: nextValueState } = nextState
    const { currentValue: nextValueProp } = nextProps

    if (theme !== nextTheme) {
      return true
    }

    if (nextValueState === value || nextValueProp === value) {
      return false
    }

    return true
  }

  render () {
    const { inputEl, handleSubmit, props, props: { theme } } = this
    const { label = null, currentValue } = this.state

    return (
      <MenuRangeWrapper theme={theme} onChange={handleSubmit}>
        <MenuRangeLabel theme={theme}>{label}</MenuRangeLabel>
        <Range type="range" ref={inputEl} defaultValue={currentValue} theme={theme} min={props.min} max={props.max} step={props.step}>{props.children}</Range>
      </MenuRangeWrapper>
    ) 
  }
}