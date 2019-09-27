import React from 'react'
import styled from 'styled-components'

const MenuCheckboxWrapper = styled.form`
  color: ${props => props.theme.primaryFontColor};
  ${'' /* border: 1px solid ${props => props.theme.primaryButtonColor}; */}
  border-radius: 3px;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const MenuCheckboxLabel = styled.label`
  font-weight: bold;
  ::after {
    content: ':';
  }
`

const Input = styled.input.attrs(props => ({
  transitionCode: 'ease-in 0.125s'
}))`
  appearance: none;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${props => props.theme.primaryButtonHoverColor};
  color: ${props => props.theme.primaryButtonFontColor};
  outline: 0;
  position: relative;
  border-radius: 25px;
  transition: background-color ${({ transitionCode }) => transitionCode}; 
  &:checked {
    background-color: ${props => props.theme.primaryButtonColor};
    color: ${props => props.theme.primaryButtonFontColor};
  }
  &:after {
    content: ' ';
    position: absolute;
    left: 25%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 17px;
    height: 17px;
    border-radius: 50%;
    background-color:  ${props => props.theme.primaryButtonFontColor};
    transition: left ${({ transitionCode }) => transitionCode}, background-color ${({ transitionCode }) => transitionCode};
  }
  &:checked:after {
    left: 75%;
    background-color: ${props => props.theme.primaryButtonFontColor};
  }
`

export default function MenuCheckbox ({ theme, label = null, onsubmit, checked = false }) {
  const handleChange = event => {
    const value = event.target.checked

    onsubmit(value)
  }

  return (
    <MenuCheckboxWrapper theme={theme} onChange={handleChange}>
      <MenuCheckboxLabel theme={theme}>{label}</MenuCheckboxLabel>
      <Input type="checkbox" theme={theme} defaultChecked={checked}/>
    </MenuCheckboxWrapper>
  )
}