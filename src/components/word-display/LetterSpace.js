import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import useGameState from '../../game-state/useGameState'

const LetterBlankWrapper = styled.span`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`

const LetterBlank = () => {
  const [animationDone, setAnimationDone] = useState(false)

  const finishAnimation = () => {
    setAnimationDone(true)
  }

  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    onRest: finishAnimation,
    config: {
      duration: 10000
    }
  })

  const renderLetterBlank = () => {
    if (animationDone) {
      return <span>&#95;</span>
    }

    return (
      <animated.span style={spring}>
        <LetterVisibleWrapper>&#95;</LetterVisibleWrapper>
      </animated.span>
    )
  }

  return <LetterBlankWrapper>&#95;</LetterBlankWrapper>
}

const LetterVisibleWrapper = styled.span`
  &.not-guessed {
    color: hsl(0, 65%, 60%);
  }
`

const LetterVisible = ({ children, guessed = true }) => {
  const [animationDone, setAnimationDone] = useState(false)
  
  const finishAnimation = () => {
    setAnimationDone(true)
  }

  const spring = useSpring({
    from: {
      transform: 'translateY(50px)',
      opacity: 0
    },
    to: [
      { transform: 'translateY(0px)', opacity: 1 }
    ],
    onRest: finishAnimation,
    config: {
      velocity: 50
    }
  })

  const renderLetterVisible = () => {
    if (animationDone) {
      return <LetterVisibleWrapper className={guessed ? '' : 'not-guessed'}>{children}</LetterVisibleWrapper>
    }

    return (
      <Fragment>
        <animated.span style={spring}>
          <LetterVisibleWrapper className={guessed ? '' : 'not-guessed'}>{children}</LetterVisibleWrapper>
        </animated.span>
        <LetterBlank/>
      </Fragment>
    )
  }

  return (
    <Fragment>
      { renderLetterVisible() }
    </Fragment>
  )
}

const LetterSpaceWrapper = styled.span.attrs(props => ({
  fontSize: `calc(50vw / ${props.wordLength})`,
  fontSizeTablet: `calc(60vw / ${props.wordLength})`,
  fontSizeMobile: `calc(90vw / ${props.wordLength})`
}))`
  color: hsl(0%, 0%, 90%);
  font-size: 2rem;
  font-size: ${({ fontSizeMobile }) => fontSizeMobile};
  margin: 0 0rem;
  width: 2rem;
  width: ${({ fontSizeMobile }) => fontSizeMobile};
  height: 2rem;
  height: ${({ fontSizeMobile }) => fontSizeMobile};
  ${'' /* display: inline-block; */}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-transform: capitalize;
  user-select: none;
  position: relative;
  @media screen and (min-width: 568px) {
    font-size: ${({ fontSizeTablet }) => fontSizeTablet};
    width: ${({ fontSizeTablet }) => fontSizeTablet};
    height: ${({ fontSizeTablet }) => fontSizeTablet};
  }
  @media screen and (min-width: 768px) {
    font-size: ${({ fontSize }) => fontSize};
    width: ${({ fontSize }) => fontSize};
    height: ${({ fontSize }) => fontSize};
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
