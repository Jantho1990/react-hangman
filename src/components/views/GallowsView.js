import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import useGameState from '../../game-state/useGameState'

const GallowsViewWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${'' /* background-color: hsla(0, 0%, 50%, 25%); */}
  @media screen and (min-width: 568px) {
    height: auto;
  }
  @media screen and (min-width: 768px) {
    height: 100%;
  }
`

const SvgEl = styled.svg`
  height: 100%;
  @media screen and (min-width: 568px) and (max-width: 768px) {
    max-height: 30vh;
  }
`

const SvgLine = ({ start, end }) => {
  const { theme } = useGameState()

  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 }
  })

  return (
    <animated.line style={spring} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={theme.primaryFontColor}/>
  )
}

const GroundLine = ({ start, end }) => {
  const { theme } = useGameState()

  return (
    <line style={{strokeWidth: '0.25px'}} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={theme.primaryFontColor}/>
  )
}

const GallowsLine = ({ start, end }) => {
  return <SvgLine start={start} end={end}/>
}

const FigureLine = ({ start, end }) => {
  return <SvgLine start={start} end={end}/>
}

const FigureHead = ({ center, radius }) => {
  const { theme } = useGameState()

  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 }
  })

  const cx = center.x
  const cy = center.y

  return <animated.circle style={spring} cx={cx} cy={cy} r={radius} fill="none" stroke={theme.primaryFontColor}/>
}

export default function GallowsView({ maxGuesses, wrongGuesses, gameOver, victory }) {
  const piecesArray = piecesConfiguration[maxGuesses]

  const width = 70
  const height = 80

  return (
    <GallowsViewWrapper>
      <SvgEl viewBox={`0, 0, ${width}, ${height}`}>
        {Object.values(piecesArray).reduce((carry, piece, i) => {
          if (i < wrongGuesses) {
            carry.push(piece)
          }

          return carry
        }, [])}
        {pieces.ground[1]}
      </SvgEl>
    </GallowsViewWrapper>
  )
}

const pieces = {
  ground: {
    1: <GroundLine start={{x: 5, y: 75}} end={{x: 65, y: 75}}/>
  },
  gallows: {
    base: {
      1: <GallowsLine key={'gallowsBase1'} start={{x: 10, y: 68}} end={{x: 30, y: 68}}/>,
      2: <GallowsLine key={'gallowsBase2'} start={{x: 30, y: 68}} end={{x: 40, y: 68}}/>,
      3: <GallowsLine key={'gallowsBase3'} start={{x: 40, y: 68}} end={{x: 60, y: 68}}/>,
      4: <GallowsLine key={'gallowsBase4'} start={{x: 10, y: 75}} end={{x: 10, y: 65}}/>,
      5: <GallowsLine key={'gallowsBase5'} start={{x: 60, y: 75}} end={{x: 60, y: 65}}/>,
      6: <GallowsLine key={'gallowsBase6'} start={{x: 10, y: 65}} end={{x: 20, y: 65}}/>,
      7: <GallowsLine key={'gallowsBase7'} start={{x: 20, y: 65}} end={{x: 30, y: 65}}/>,
      8: <GallowsLine key={'gallowsBase8'} start={{x: 30, y: 65}} end={{x: 40, y: 65}}/>,
      9: <GallowsLine key={'gallowsBase9'} start={{x: 40, y: 65}} end={{x: 50, y: 65}}/>,
      10: <GallowsLine key={'gallowsBase10'} start={{x: 50, y: 65}} end={{x: 60, y: 65}}/>,
    },
    upright: {
      1: <GallowsLine key={'gallowsUpright1'} start={{x: 30, y: 65}} end={{x: 30, y: 55}}/>,
      2: <GallowsLine key={'gallowsUpright2'} start={{x: 30, y: 55}} end={{x: 30, y: 45}}/>,
      3: <GallowsLine key={'gallowsUpright3'} start={{x: 30, y: 45}} end={{x: 30, y: 35}}/>,
      4: <GallowsLine key={'gallowsUpright4'} start={{x: 30, y: 35}} end={{x: 30, y: 25}}/>,
      5: <GallowsLine key={'gallowsUpright5'} start={{x: 30, y: 25}} end={{x: 30, y: 15}}/>
    },
    beam: {
      1: <GallowsLine key={'gallowsLine1'} start={{x: 30, y: 15}} end={{x: 40, y: 15}}/>,
      2: <GallowsLine key={'gallowsLine2'} start={{x: 40, y: 15}} end={{x: 50, y: 15}}/>
    },
    rope: {
      1: <GallowsLine key={'gallowsRope1'} start={{x: 50, y: 15}} end={{x: 50, y: 20}}/>,
      2: <GallowsLine key={'gallowsRope2'} start={{x: 50, y: 20}} end={{x: 50, y: 25}}/>
    }
  },
  figure: {
    head: <FigureHead key="figureHead" center={{x: 50, y: 30}} radius={5}/>,
    neck: <FigureLine key="figureNeck" start={{x: 50, y: 35}} end={{x: 50, y: 40}}/>,
    leftArm: <FigureLine key="figureLeftArm" start={{x: 50, y: 40}} end={{x: 47, y: 45}}/>,
    rightArm: <FigureLine key="figureRightArm" start={{x: 50, y: 40}} end={{x: 53, y: 45}}/>,
    torso: <FigureLine key="figureTorso" start={{x: 50, y: 40}} end={{x: 50, y: 50}}/>,
    leftLeg: <FigureLine key="figureLeftLeg" start={{x: 50, y: 50}} end={{x: 45, y: 57}}/>,
    rightLeg: <FigureLine key="figureRightLeg" start={{x: 50, y: 50}} end={{x: 55, y: 57}}/>
  }
}

const piecesConfiguration = {
  1: [
    [
      pieces.gallows.base[1], pieces.gallows.base[2]
    ]
  ],
  2: [
    [
      pieces.gallows.base[1], pieces.gallows.base[2]
    ],
    [ pieces.figure[1], pieces.figure[2] ]
  ],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
  10: {
    1: [
      pieces.gallows.base[1], pieces.gallows.base[2], pieces.gallows.base[3], pieces.gallows.base[4],
      pieces.gallows.base[5], pieces.gallows.base[6], pieces.gallows.base[7], pieces.gallows.base[8],
      pieces.gallows.base[9], pieces.gallows.base[10]
    ],
    2: [
      pieces.gallows.upright[1], pieces.gallows.upright[2], pieces.gallows.upright[3],
      pieces.gallows.upright[4], pieces.gallows.upright[5]
    ],
    3: [pieces.gallows.beam[1], pieces.gallows.beam[2], pieces.gallows.rope[1], pieces.gallows.rope[2]],
    4: [pieces.figure.head],
    5: [pieces.figure.neck],
    6: [pieces.figure.leftArm],
    7: [pieces.figure.rightArm],
    8: [pieces.figure.torso],
    9: [pieces.figure.leftLeg],
    10: [pieces.figure.rightLeg],
  },
  11: [],
  12: [],
  13: [],
  14: [],
  15: [],
  16: [],
  17: [],
  18: [],
  19: [],
  20: [],
  21: [],
  22: [],
  23: [],
  24: [],
  25: [],
  26: [],
}