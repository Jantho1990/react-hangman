import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import useGameState from 'game-state/useGameState'

const LetterBlankWrapper = styled.span`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`

const LetterBlank = ({ guessed = false }) => {
  const spring = useSpring({
    from: { opacity: 1 },
    to: { opacity: 0 },
    delay: 100
  })

  const renderLetterBlank = () => {
    if (guessed) {
      return (
        <animated.span style={spring}>
          <LetterBlankWrapper>&#95;</LetterBlankWrapper>
        </animated.span>
      )
    }
    
    return <span>&#95;</span>
  }

  return (
    <LetterBlankWrapper>
      {renderLetterBlank()}
    </LetterBlankWrapper>
  )
}

const LetterVisibleWrapper = styled.span`
  &.not-guessed {
    color: hsl(0, 65%, 60%);
  }
`

const LetterVisible = ({ children, guessed = false }) => {
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
        <LetterBlank guessed={guessed}/>
      </Fragment>
    )
  }

  return (
    <Fragment>
      { renderLetterVisible() }
    </Fragment>
  )
}

const LetterSpaceWrapper = styled.span.attrs(({ scale, wordLength }) => ({
  fontSize: scale ? `calc(50vw / ${wordLength})` : '2rem',
  fontSizeTablet: scale ? `calc(75vmin / ${wordLength})` : '2rem',
  fontSizeMobile: scale ? `calc(90vw / ${wordLength})` : '2rem'
}))`
  color: hsl(0%, 0%, 90%);
  font-size: 2rem;
  font-size: ${({ fontSizeMobile }) => fontSizeMobile};
  margin: 0 0rem;
  width: 2rem;
  width: ${({ fontSizeMobile }) => fontSizeMobile};
  height: 2rem;
  height: ${({ fontSizeMobile }) => fontSizeMobile};
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

export default function LetterSpace({ display = false, guessed = false, children, scale = true }) {
  const { word } = useGameState()

  const wordLength = word.length

  const renderSpace = () => {
    if (display) {
      return <LetterVisible guessed={guessed}>{children}</LetterVisible>
    }

    return <LetterBlank/>
  }

  return (
    <LetterSpaceWrapper scale={scale} wordLength={wordLength}>
      {renderSpace()}
    </LetterSpaceWrapper>
  )
}
