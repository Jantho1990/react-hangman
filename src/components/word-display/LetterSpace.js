import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import useGameState from '../game-state/useGameState'

const LetterBlank = () => {
  return <span>&#95;</span>
}

const LetterVisibleWrapper = styled.span`
  &.not-guessed {
    color: hsl(0, 65%, 60%);
  }
`

const LetterVisible = ({ children, guessed = true }) => {
  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 }
  })
  return (
    <animated.span style={spring}>
      <LetterVisibleWrapper className={guessed ? '' : 'not-guessed'}>{children}</LetterVisibleWrapper>
    </animated.span>
  )
}

const LetterSpaceWrapper = styled.span.attrs(props => ({
  fontSize: `calc(50vw / ${props.wordLength})`,
  fontSizeMobile: `calc(90vw / ${props.wordLength})`
}))`
  color: hsl(0%, 0%, 90%);
  font-size: 2rem;
  font-size: ${({ fontSizeMobile }) => fontSizeMobile};
  margin: 0 0rem;
  width: 2rem;
  width: ${({ fontSizeMobile }) => fontSizeMobile};
  display: inline-block;
  text-transform: capitalize;
  user-select: none;
  @media screen and (min-width: 768px) {
    font-size: ${({ fontSize }) => fontSize};
    width: ${({ fontSize }) => fontSize};
  }
`

export default function LetterSpace({ letterGuessed, gameOver, children }) {
  const { word } = useGameState()

  const wordLength = word.length

  const renderSpace = () => {
    if (letterGuessed) {
      return <LetterVisible>{children}</LetterVisible>
    } else if (gameOver) {
      return <LetterVisible guessed={false}>{children}</LetterVisible>
    }

    return <LetterBlank/>
  }

  return (
    <LetterSpaceWrapper wordLength={wordLength}>
      {renderSpace()}
    </LetterSpaceWrapper>
  )
}
