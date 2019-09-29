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
    color: ${({ theme }) => theme.gameScreen.wordDisplay.color.wrong};
  }
`

const LetterVisible = ({ children, guessed = false }) => {
  const { theme } = useGameState()
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
      return <LetterVisibleWrapper className={guessed ? '' : 'not-guessed'} theme={theme}>{children}</LetterVisibleWrapper>
    }

    return (
      <Fragment>
        <animated.span style={spring}>
          <LetterVisibleWrapper className={guessed ? '' : 'not-guessed'} theme={theme}>{children}</LetterVisibleWrapper>
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

const LetterSpaceWrapper = styled.span.attrs(({ scale = 1, wordLength }) => ({
  fontSize: scale ? `calc((50vw * ${scale}) / ${wordLength})` : '2rem',
  fontSizeTablet: scale ? `calc((75vmin * ${scale}) / ${wordLength})` : '2rem',
  fontSizeMobile: scale ? `calc((90vw * ${scale}) / ${wordLength})` : '2rem'
}))`
  color: ${({ theme }) => theme.gameScreen.wordDisplay.color.default};
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
  font-family: ${({ wordDisplay }) => wordDisplay};
  font-weight: bold;
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

export default function LetterSpace({ display = false, word, guessed = false, children, scale = true }) {
  const {
    theme,
    fonts: {
      wordDisplay
    }
  } = useGameState()

  const wordLength = word.length

  const renderSpace = () => {
    if (display) {
      return <LetterVisible guessed={guessed}>{children}</LetterVisible>
    }

    return <LetterBlank/>
  }

  return (
    <LetterSpaceWrapper scale={scale} theme={theme} wordLength={wordLength} wordDisplay={wordDisplay}>
      {renderSpace()}
    </LetterSpaceWrapper>
  )
}
