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
    height: 30vh;
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
      1: <GallowsLine key={'gallowsBase1'} start={{x: 10, y: 68}} end={{x: 31, y: 68}}/>,
      2: <GallowsLine key={'gallowsBase2'} start={{x: 29, y: 68}} end={{x: 41, y: 68}}/>,
      3: <GallowsLine key={'gallowsBase3'} start={{x: 39, y: 68}} end={{x: 60, y: 68}}/>,
      4: <GallowsLine key={'gallowsBase4'} start={{x: 10, y: 75}} end={{x: 10, y: 65}}/>,
      5: <GallowsLine key={'gallowsBase5'} start={{x: 60, y: 75}} end={{x: 60, y: 65}}/>,
      6: <GallowsLine key={'gallowsBase6'} start={{x: 9, y: 65}} end={{x: 21, y: 65}}/>,
      7: <GallowsLine key={'gallowsBase7'} start={{x: 20, y: 65}} end={{x: 31, y: 65}}/>,
      8: <GallowsLine key={'gallowsBase8'} start={{x: 30, y: 65}} end={{x: 41, y: 65}}/>,
      9: <GallowsLine key={'gallowsBase9'} start={{x: 40, y: 65}} end={{x: 51, y: 65}}/>,
      10: <GallowsLine key={'gallowsBase10'} start={{x: 50, y: 65}} end={{x: 61, y: 65}}/>,
    },
    upright: {
      1: <GallowsLine key={'gallowsUpright1'} start={{x: 30, y: 65}} end={{x: 30, y: 55}}/>,
      2: <GallowsLine key={'gallowsUpright2'} start={{x: 30, y: 56}} end={{x: 30, y: 45}}/>,
      3: <GallowsLine key={'gallowsUpright3'} start={{x: 30, y: 46}} end={{x: 30, y: 35}}/>,
      4: <GallowsLine key={'gallowsUpright4'} start={{x: 30, y: 36}} end={{x: 30, y: 25}}/>,
      5: <GallowsLine key={'gallowsUpright5'} start={{x: 30, y: 26}} end={{x: 30, y: 15}}/>
    },
    beam: {
      1: <GallowsLine key={'gallowsLine1'} start={{x: 28, y: 15}} end={{x: 40, y: 15}}/>,
      2: <GallowsLine key={'gallowsLine2'} start={{x: 39, y: 15}} end={{x: 51, y: 15}}/>
    },
    rope: {
      1: <GallowsLine key={'gallowsRope1'} start={{x: 50, y: 15}} end={{x: 50, y: 20}}/>,
      2: <GallowsLine key={'gallowsRope2'} start={{x: 50, y: 20}} end={{x: 50, y: 25}}/>
    }
  },
  figure: {
    head: <FigureHead key="figureHead" center={{x: 50, y: 30}} radius={5}/>,
    neck: <FigureLine key="figureNeck" start={{x: 50, y: 35}} end={{x: 50, y: 40}}/>,
    leftArm: <FigureLine key="figureLeftArm" start={{x: 50, y: 38}} end={{x: 45, y: 45}}/>,
    rightArm: <FigureLine key="figureRightArm" start={{x: 50, y: 38}} end={{x: 55, y: 45}}/>,
    torso: <FigureLine key="figureTorso" start={{x: 50, y: 39}} end={{x: 50, y: 50}}/>,
    leftLeg: <FigureLine key="figureLeftLeg" start={{x: 50, y: 49}} end={{x: 45, y: 57}}/>,
    rightLeg: <FigureLine key="figureRightLeg" start={{x: 50, y: 49}} end={{x: 55, y: 57}}/>
  }
}

const piecesConfiguration = {
  1: {
    1: [
      pieces.gallows.base[1], pieces.gallows.base[2], pieces.gallows.base[3], pieces.gallows.base[4],
      pieces.gallows.base[5], pieces.gallows.base[6], pieces.gallows.base[7], pieces.gallows.base[8],
      pieces.gallows.base[9], pieces.gallows.base[10],
      pieces.gallows.upright[1], pieces.gallows.upright[2], pieces.gallows.upright[3],
      pieces.gallows.upright[4], pieces.gallows.upright[5],
      pieces.gallows.beam[1], pieces.gallows.beam[2], pieces.gallows.rope[1], pieces.gallows.rope[2],
      pieces.figure.head, pieces.figure.neck, pieces.figure.leftArm, pieces.figure.rightArm,
      pieces.figure.torso, pieces.figure.leftLeg, pieces.figure.rightLeg
    ]
  },
  2: {
    1: [
      pieces.gallows.base[1], pieces.gallows.base[2], pieces.gallows.base[3], pieces.gallows.base[4],
      pieces.gallows.base[5], pieces.gallows.base[6], pieces.gallows.base[7], pieces.gallows.base[8],
      pieces.gallows.base[9], pieces.gallows.base[10],
      pieces.gallows.upright[1], pieces.gallows.upright[2], pieces.gallows.upright[3],
      pieces.gallows.upright[4], pieces.gallows.upright[5],
      pieces.gallows.beam[1], pieces.gallows.beam[2], pieces.gallows.rope[1], pieces.gallows.rope[2]
    ],
    2: [
      pieces.figure.head, pieces.figure.neck, pieces.figure.leftArm, pieces.figure.rightArm,
      pieces.figure.torso, pieces.figure.leftLeg, pieces.figure.rightLeg
    ]
  },
  3: {
    1: [
      pieces.gallows.base[1], pieces.gallows.base[2], pieces.gallows.base[3], pieces.gallows.base[4],
      pieces.gallows.base[5], pieces.gallows.base[6], pieces.gallows.base[7], pieces.gallows.base[8],
      pieces.gallows.base[9], pieces.gallows.base[10]
    ],
    2: [
      pieces.gallows.upright[1], pieces.gallows.upright[2], pieces.gallows.upright[3],
      pieces.gallows.upright[4], pieces.gallows.upright[5],
      pieces.gallows.beam[1], pieces.gallows.beam[2], pieces.gallows.rope[1], pieces.gallows.rope[2]
    ],
    3: [
      pieces.figure.head, pieces.figure.neck, pieces.figure.leftArm, pieces.figure.rightArm,
      pieces.figure.torso, pieces.figure.leftLeg, pieces.figure.rightLeg
    ]
  },
  4: {
    1: [
      pieces.gallows.base[1], pieces.gallows.base[2], pieces.gallows.base[3], pieces.gallows.base[4],
      pieces.gallows.base[5], pieces.gallows.base[6], pieces.gallows.base[7], pieces.gallows.base[8],
      pieces.gallows.base[9], pieces.gallows.base[10]
    ],
    2: [
      pieces.gallows.upright[1], pieces.gallows.upright[2], pieces.gallows.upright[3],
      pieces.gallows.upright[4], pieces.gallows.upright[5],
      pieces.gallows.beam[1], pieces.gallows.beam[2], pieces.gallows.rope[1], pieces.gallows.rope[2]
    ],
    3: [pieces.figure.head, pieces.figure.neck, pieces.figure.leftArm, pieces.figure.rightArm],
    4: [pieces.figure.torso, pieces.figure.leftLeg, pieces.figure.rightLeg]
  },
  5: {
    1: [
      pieces.gallows.base[1], pieces.gallows.base[2], pieces.gallows.base[3], pieces.gallows.base[4],
      pieces.gallows.base[5], pieces.gallows.base[6], pieces.gallows.base[7], pieces.gallows.base[8],
      pieces.gallows.base[9], pieces.gallows.base[10]
    ],
    2: [
      pieces.gallows.upright[1], pieces.gallows.upright[2], pieces.gallows.upright[3],
      pieces.gallows.upright[4], pieces.gallows.upright[5],
      pieces.gallows.beam[1], pieces.gallows.beam[2], pieces.gallows.rope[1], pieces.gallows.rope[2]
    ],
    3: [pieces.figure.head, pieces.figure.neck],
    4: [pieces.figure.leftArm, pieces.figure.rightArm, pieces.figure.torso],
    5: [pieces.figure.leftLeg, pieces.figure.rightLeg]
  },
  6: {
    1: [
      pieces.gallows.base[1], pieces.gallows.base[2], pieces.gallows.base[3], pieces.gallows.base[4],
      pieces.gallows.base[5], pieces.gallows.base[6], pieces.gallows.base[7], pieces.gallows.base[8],
      pieces.gallows.base[9], pieces.gallows.base[10]
    ],
    2: [
      pieces.gallows.upright[1], pieces.gallows.upright[2], pieces.gallows.upright[3],
      pieces.gallows.upright[4], pieces.gallows.upright[5],
      pieces.gallows.beam[1], pieces.gallows.beam[2], pieces.gallows.rope[1], pieces.gallows.rope[2]
    ],
    3: [pieces.figure.head, pieces.figure.neck],
    4: [pieces.figure.leftArm, pieces.figure.rightArm],
    5: [pieces.figure.torso],
    6: [pieces.figure.leftLeg, pieces.figure.rightLeg]
  },
  7: {
    1: [
      pieces.gallows.base[1], pieces.gallows.base[2], pieces.gallows.base[3], pieces.gallows.base[4],
      pieces.gallows.base[5], pieces.gallows.base[6], pieces.gallows.base[7], pieces.gallows.base[8],
      pieces.gallows.base[9], pieces.gallows.base[10]
    ],
    2: [
      pieces.gallows.upright[1], pieces.gallows.upright[2], pieces.gallows.upright[3],
      pieces.gallows.upright[4], pieces.gallows.upright[5],
      pieces.gallows.beam[1], pieces.gallows.beam[2], pieces.gallows.rope[1], pieces.gallows.rope[2]
    ],
    3: [pieces.figure.head],
    4: [pieces.figure.neck],
    5: [pieces.figure.leftArm, pieces.figure.rightArm],
    6: [pieces.figure.torso],
    7: [pieces.figure.leftLeg, pieces.figure.rightLeg]
  },
  8: {
    1: [
      pieces.gallows.base[1], pieces.gallows.base[2], pieces.gallows.base[3], pieces.gallows.base[4],
      pieces.gallows.base[5], pieces.gallows.base[6], pieces.gallows.base[7], pieces.gallows.base[8],
      pieces.gallows.base[9], pieces.gallows.base[10]
    ],
    2: [
      pieces.gallows.upright[1], pieces.gallows.upright[2], pieces.gallows.upright[3],
      pieces.gallows.upright[4], pieces.gallows.upright[5],
      pieces.gallows.beam[1], pieces.gallows.beam[2], pieces.gallows.rope[1], pieces.gallows.rope[2]
    ],
    3: [pieces.figure.head],
    4: [pieces.figure.neck],
    5: [pieces.figure.leftArm, pieces.figure.rightArm],
    6: [pieces.figure.torso],
    7: [pieces.figure.leftLeg],
    8: [pieces.figure.rightLeg]
  },
  9: {
    1: [
      pieces.gallows.base[1], pieces.gallows.base[2], pieces.gallows.base[3], pieces.gallows.base[4],
      pieces.gallows.base[5], pieces.gallows.base[6], pieces.gallows.base[7], pieces.gallows.base[8],
      pieces.gallows.base[9], pieces.gallows.base[10]
    ],
    2: [
      pieces.gallows.upright[1], pieces.gallows.upright[2], pieces.gallows.upright[3],
      pieces.gallows.upright[4], pieces.gallows.upright[5],
      pieces.gallows.beam[1], pieces.gallows.beam[2], pieces.gallows.rope[1], pieces.gallows.rope[2]
    ],
    3: [pieces.figure.head],
    4: [pieces.figure.neck],
    5: [pieces.figure.leftArm],
    6: [pieces.figure.rightArm],
    7: [pieces.figure.torso],
    8: [pieces.figure.leftLeg],
    9: [pieces.figure.rightLeg]
  },
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
    10: [pieces.figure.rightLeg]
  },
  11: {
    1: [
      pieces.gallows.base[1], pieces.gallows.base[2], pieces.gallows.base[3], pieces.gallows.base[4], pieces.gallows.base[5],
      pieces.gallows.base[6], pieces.gallows.base[7], pieces.gallows.base[8], pieces.gallows.base[9], pieces.gallows.base[10]
    ],
    2: [pieces.gallows.upright[1], pieces.gallows.upright[2], pieces.gallows.upright[3], pieces.gallows.upright[4], pieces.gallows.upright[5]],
    3: [pieces.gallows.beam[1], pieces.gallows.beam[2]],
    4: [pieces.gallows.rope[1], pieces.gallows.rope[2]],
    5: [pieces.figure.head],
    6: [pieces.figure.neck],
    7: [pieces.figure.leftArm],
    8: [pieces.figure.rightArm],
    9: [pieces.figure.torso],
    10: [pieces.figure.leftLeg],
    11: [pieces.figure.rightLeg]
  },
  12: {
    1: [pieces.gallows.base[1], pieces.gallows.base[2], pieces.gallows.base[3], pieces.gallows.base[4], pieces.gallows.base[5]],
    2: [pieces.gallows.base[6], pieces.gallows.base[7], pieces.gallows.base[8], pieces.gallows.base[9], pieces.gallows.base[10]],
    3: [pieces.gallows.upright[1], pieces.gallows.upright[2], pieces.gallows.upright[3], pieces.gallows.upright[4], pieces.gallows.upright[5]],
    4: [pieces.gallows.beam[1], pieces.gallows.beam[2]],
    5: [pieces.gallows.rope[1], pieces.gallows.rope[2]],
    6: [pieces.figure.head],
    7: [pieces.figure.neck],
    8: [pieces.figure.leftArm],
    9: [pieces.figure.rightArm],
    10: [pieces.figure.torso],
    11: [pieces.figure.leftLeg],
    12: [pieces.figure.rightLeg]
  },
  13: {
    1: [pieces.gallows.base[1], pieces.gallows.base[2], pieces.gallows.base[3]],
    2: [pieces.gallows.base[4], pieces.gallows.base[5]],
    3: [pieces.gallows.base[6], pieces.gallows.base[7], pieces.gallows.base[8], pieces.gallows.base[9], pieces.gallows.base[10]],
    4: [pieces.gallows.upright[1], pieces.gallows.upright[2], pieces.gallows.upright[3], pieces.gallows.upright[4], pieces.gallows.upright[5]],
    5: [pieces.gallows.beam[1], pieces.gallows.beam[2]],
    6: [pieces.gallows.rope[1], pieces.gallows.rope[2]],
    7: [pieces.figure.head],
    8: [pieces.figure.neck],
    9: [pieces.figure.leftArm],
    10: [pieces.figure.rightArm],
    11: [pieces.figure.torso],
    12: [pieces.figure.leftLeg],
    13: [pieces.figure.rightLeg]
  },
  14: {
    1: [pieces.gallows.base[1], pieces.gallows.base[2], pieces.gallows.base[3]],
    2: [pieces.gallows.base[4], pieces.gallows.base[5]],
    3: [pieces.gallows.base[6], pieces.gallows.base[7], pieces.gallows.base[8], pieces.gallows.base[9], pieces.gallows.base[10]],
    4: [pieces.gallows.upright[1], pieces.gallows.upright[2]],
    5: [pieces.gallows.upright[3], pieces.gallows.upright[4], pieces.gallows.upright[5]],
    6: [pieces.gallows.beam[1], pieces.gallows.beam[2]],
    7: [pieces.gallows.rope[1], pieces.gallows.rope[2]],
    8: [pieces.figure.head],
    9: [pieces.figure.neck],
    10: [pieces.figure.leftArm],
    11: [pieces.figure.rightArm],
    12: [pieces.figure.torso],
    13: [pieces.figure.leftLeg],
    14: [pieces.figure.rightLeg]
  },
  15: {
    1: [pieces.gallows.base[1], pieces.gallows.base[2], pieces.gallows.base[3]],
    2: [pieces.gallows.base[4], pieces.gallows.base[5]],
    3: [pieces.gallows.base[6], pieces.gallows.base[7], pieces.gallows.base[8], pieces.gallows.base[9], pieces.gallows.base[10]],
    4: [pieces.gallows.upright[1], pieces.gallows.upright[2]],
    5: [pieces.gallows.upright[3], pieces.gallows.upright[4]],
    6: [pieces.gallows.upright[5]],
    7: [pieces.gallows.beam[1], pieces.gallows.beam[2]],
    8: [pieces.gallows.rope[1], pieces.gallows.rope[2]],
    9: [pieces.figure.head],
    10: [pieces.figure.neck],
    11: [pieces.figure.leftArm],
    12: [pieces.figure.rightArm],
    13: [pieces.figure.torso],
    14: [pieces.figure.leftLeg],
    15: [pieces.figure.rightLeg]
  },
  16: {
    1: [pieces.gallows.base[1], pieces.gallows.base[2], pieces.gallows.base[3]],
    2: [pieces.gallows.base[4], pieces.gallows.base[5]],
    3: [pieces.gallows.base[6], pieces.gallows.base[7], pieces.gallows.base[8]],
    4: [pieces.gallows.base[9], pieces.gallows.base[10]],
    5: [pieces.gallows.upright[1], pieces.gallows.upright[2]],
    6: [pieces.gallows.upright[3], pieces.gallows.upright[4]],
    7: [pieces.gallows.upright[5]],
    8: [pieces.gallows.beam[1], pieces.gallows.beam[2]],
    9: [pieces.gallows.rope[1], pieces.gallows.rope[2]],
    10: [pieces.figure.head],
    11: [pieces.figure.neck],
    12: [pieces.figure.leftArm],
    13: [pieces.figure.rightArm],
    14: [pieces.figure.torso],
    15: [pieces.figure.leftLeg],
    16: [pieces.figure.rightLeg]
  },
  17: {
    1: [pieces.gallows.base[1], pieces.gallows.base[2], pieces.gallows.base[3]],
    2: [pieces.gallows.base[4], pieces.gallows.base[5]],
    3: [pieces.gallows.base[6], pieces.gallows.base[7]],
    4: [pieces.gallows.base[8]],
    5: [pieces.gallows.base[9], pieces.gallows.base[10]],
    6: [pieces.gallows.upright[1], pieces.gallows.upright[2]],
    7: [pieces.gallows.upright[3], pieces.gallows.upright[4]],
    8: [pieces.gallows.upright[5]],
    9: [pieces.gallows.beam[1], pieces.gallows.beam[2]],
    10: [pieces.gallows.rope[1], pieces.gallows.rope[2]],
    11: [pieces.figure.head],
    12: [pieces.figure.neck],
    13: [pieces.figure.leftArm],
    14: [pieces.figure.rightArm],
    15: [pieces.figure.torso],
    16: [pieces.figure.leftLeg],
    17: [pieces.figure.rightLeg]
  },
  18: {
    1: [pieces.gallows.base[1], pieces.gallows.base[2]],
    2: [pieces.gallows.base[3]],
    3: [pieces.gallows.base[4], pieces.gallows.base[5]],
    4: [pieces.gallows.base[6], pieces.gallows.base[7]],
    5: [pieces.gallows.base[8]],
    6: [pieces.gallows.base[9], pieces.gallows.base[10]],
    7: [pieces.gallows.upright[1], pieces.gallows.upright[2]],
    8: [pieces.gallows.upright[3], pieces.gallows.upright[4]],
    9: [pieces.gallows.upright[5]],
    10: [pieces.gallows.beam[1], pieces.gallows.beam[2]],
    11: [pieces.gallows.rope[1], pieces.gallows.rope[2]],
    12: [pieces.figure.head],
    13: [pieces.figure.neck],
    14: [pieces.figure.leftArm],
    15: [pieces.figure.rightArm],
    16: [pieces.figure.torso],
    17: [pieces.figure.leftLeg],
    18: [pieces.figure.rightLeg]
  },
  19: {
    1: [pieces.gallows.base[1], pieces.gallows.base[2]],
    2: [pieces.gallows.base[3]],
    3: [pieces.gallows.base[4], pieces.gallows.base[5]],
    4: [pieces.gallows.base[6], pieces.gallows.base[7]],
    5: [pieces.gallows.base[8]],
    6: [pieces.gallows.base[9], pieces.gallows.base[10]],
    7: [pieces.gallows.upright[1], pieces.gallows.upright[2]],
    8: [pieces.gallows.upright[3]],
    9: [pieces.gallows.upright[4]],
    10: [pieces.gallows.upright[5]],
    11: [pieces.gallows.beam[1], pieces.gallows.beam[2]],
    12: [pieces.gallows.rope[1], pieces.gallows.rope[2]],
    13: [pieces.figure.head],
    14: [pieces.figure.neck],
    15: [pieces.figure.leftArm],
    16: [pieces.figure.rightArm],
    17: [pieces.figure.torso],
    18: [pieces.figure.leftLeg],
    19: [pieces.figure.rightLeg]
  },
  20: {
    1: [pieces.gallows.base[1], pieces.gallows.base[2]],
    2: [pieces.gallows.base[3]],
    3: [pieces.gallows.base[4]],
    4: [pieces.gallows.base[5]],
    5: [pieces.gallows.base[6], pieces.gallows.base[7]],
    6: [pieces.gallows.base[8]],
    7: [pieces.gallows.base[9], pieces.gallows.base[10]],
    8: [pieces.gallows.upright[1], pieces.gallows.upright[2]],
    9: [pieces.gallows.upright[3]],
    10: [pieces.gallows.upright[4]],
    11: [pieces.gallows.upright[5]],
    12: [pieces.gallows.beam[1], pieces.gallows.beam[2]],
    13: [pieces.gallows.rope[1], pieces.gallows.rope[2]],
    14: [pieces.figure.head],
    15: [pieces.figure.neck],
    16: [pieces.figure.leftArm],
    17: [pieces.figure.rightArm],
    18: [pieces.figure.torso],
    19: [pieces.figure.leftLeg],
    20: [pieces.figure.rightLeg]
  },
  21: {
    1: [pieces.gallows.base[1], pieces.gallows.base[2]],
    2: [pieces.gallows.base[3]],
    3: [pieces.gallows.base[4]],
    4: [pieces.gallows.base[5]],
    5: [pieces.gallows.base[6], pieces.gallows.base[7]],
    6: [pieces.gallows.base[8]],
    7: [pieces.gallows.base[9]],
    8: [pieces.gallows.base[10]],
    9: [pieces.gallows.upright[1], pieces.gallows.upright[2]],
    10: [pieces.gallows.upright[3]],
    11: [pieces.gallows.upright[4]],
    12: [pieces.gallows.upright[5]],
    13: [pieces.gallows.beam[1], pieces.gallows.beam[2]],
    14: [pieces.gallows.rope[1], pieces.gallows.rope[2]],
    15: [pieces.figure.head],
    16: [pieces.figure.neck],
    17: [pieces.figure.leftArm],
    18: [pieces.figure.rightArm],
    19: [pieces.figure.torso],
    20: [pieces.figure.leftLeg],
    21: [pieces.figure.rightLeg]
  },
  22: {
    1: [pieces.gallows.base[1], pieces.gallows.base[2]],
    2: [pieces.gallows.base[3]],
    3: [pieces.gallows.base[4]],
    4: [pieces.gallows.base[5]],
    5: [pieces.gallows.base[6]],
    6: [pieces.gallows.base[7]],
    7: [pieces.gallows.base[8]],
    8: [pieces.gallows.base[9]],
    9: [pieces.gallows.base[10]],
    10: [pieces.gallows.upright[1], pieces.gallows.upright[2]],
    11: [pieces.gallows.upright[3]],
    12: [pieces.gallows.upright[4]],
    13: [pieces.gallows.upright[5]],
    14: [pieces.gallows.beam[1], pieces.gallows.beam[2]],
    15: [pieces.gallows.rope[1], pieces.gallows.rope[2]],
    16: [pieces.figure.head],
    17: [pieces.figure.neck],
    18: [pieces.figure.leftArm],
    19: [pieces.figure.rightArm],
    20: [pieces.figure.torso],
    21: [pieces.figure.leftLeg],
    22: [pieces.figure.rightLeg]
  },
  23: {
    1: [pieces.gallows.base[1]],
    2: [pieces.gallows.base[2]],
    3: [pieces.gallows.base[3]],
    4: [pieces.gallows.base[4]],
    5: [pieces.gallows.base[5]],
    6: [pieces.gallows.base[6]],
    7: [pieces.gallows.base[7]],
    8: [pieces.gallows.base[8]],
    9: [pieces.gallows.base[9]],
    10: [pieces.gallows.base[10]],
    11: [pieces.gallows.upright[1], pieces.gallows.upright[2]],
    12: [pieces.gallows.upright[3]],
    13: [pieces.gallows.upright[4]],
    14: [pieces.gallows.upright[5]],
    15: [pieces.gallows.beam[1], pieces.gallows.beam[2]],
    16: [pieces.gallows.rope[1], pieces.gallows.rope[2]],
    17: [pieces.figure.head],
    18: [pieces.figure.neck],
    19: [pieces.figure.leftArm],
    20: [pieces.figure.rightArm],
    21: [pieces.figure.torso],
    22: [pieces.figure.leftLeg],
    23: [pieces.figure.rightLeg]
  },
  24: {
    1: [pieces.gallows.base[1]],
    2: [pieces.gallows.base[2]],
    3: [pieces.gallows.base[3]],
    4: [pieces.gallows.base[4]],
    5: [pieces.gallows.base[5]],
    6: [pieces.gallows.base[6]],
    7: [pieces.gallows.base[7]],
    8: [pieces.gallows.base[8]],
    9: [pieces.gallows.base[9]],
    10: [pieces.gallows.base[10]],
    11: [pieces.gallows.upright[1]],
    12: [pieces.gallows.upright[2]],
    13: [pieces.gallows.upright[3]],
    14: [pieces.gallows.upright[4]],
    15: [pieces.gallows.upright[5]],
    16: [pieces.gallows.beam[1], pieces.gallows.beam[2]],
    17: [pieces.gallows.rope[1], pieces.gallows.rope[2]],
    18: [pieces.figure.head],
    19: [pieces.figure.neck],
    20: [pieces.figure.leftArm],
    21: [pieces.figure.rightArm],
    22: [pieces.figure.torso],
    23: [pieces.figure.leftLeg],
    24: [pieces.figure.rightLeg]
  },
  25: {
    1: [pieces.gallows.base[1]],
    2: [pieces.gallows.base[2]],
    3: [pieces.gallows.base[3]],
    4: [pieces.gallows.base[4]],
    5: [pieces.gallows.base[5]],
    6: [pieces.gallows.base[6]],
    7: [pieces.gallows.base[7]],
    8: [pieces.gallows.base[8]],
    9: [pieces.gallows.base[9]],
    10: [pieces.gallows.base[10]],
    11: [pieces.gallows.upright[1]],
    12: [pieces.gallows.upright[2]],
    13: [pieces.gallows.upright[3]],
    14: [pieces.gallows.upright[4]],
    15: [pieces.gallows.upright[5]],
    16: [pieces.gallows.beam[1]],
    17: [pieces.gallows.beam[2]],
    18: [pieces.gallows.rope[1], pieces.gallows.rope[2]],
    19: [pieces.figure.head],
    20: [pieces.figure.neck],
    21: [pieces.figure.leftArm],
    22: [pieces.figure.rightArm],
    23: [pieces.figure.torso],
    24: [pieces.figure.leftLeg],
    25: [pieces.figure.rightLeg]
  },
  26: {
    1: [pieces.gallows.base[1]],
    2: [pieces.gallows.base[2]],
    3: [pieces.gallows.base[3]],
    4: [pieces.gallows.base[4]],
    5: [pieces.gallows.base[5]],
    6: [pieces.gallows.base[6]],
    7: [pieces.gallows.base[7]],
    8: [pieces.gallows.base[8]],
    9: [pieces.gallows.base[9]],
    10: [pieces.gallows.base[10]],
    11: [pieces.gallows.upright[1]],
    12: [pieces.gallows.upright[2]],
    13: [pieces.gallows.upright[3]],
    14: [pieces.gallows.upright[4]],
    15: [pieces.gallows.upright[5]],
    16: [pieces.gallows.beam[1]],
    17: [pieces.gallows.beam[2]],
    18: [pieces.gallows.rope[1]],
    19: [pieces.gallows.rope[2]],
    20: [pieces.figure.head],
    21: [pieces.figure.neck],
    22: [pieces.figure.leftArm],
    23: [pieces.figure.rightArm],
    24: [pieces.figure.torso],
    25: [pieces.figure.leftLeg],
    26: [pieces.figure.rightLeg]
  },
}