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

const Input = styled.input`
  border: none;
  border-radius: 3px;
  padding: 0.5rem 0;
  cursor: pointer;
  background-color: ${props => props.theme.primaryButtonColor};
  color: ${props => props.theme.primaryButtonFontColor};
  &:hover {
    background-color: ${props => props.theme.primaryButtonHoverColor};
    color: ${props => props.theme.primaryButtonFontHoverColor};
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