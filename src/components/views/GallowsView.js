import React from 'react'
import styled from 'styled-components'

const GallowsViewWrapper = styled.div`
  height: 100%;
  @media screen and (min-width: 568px) {
    height: auto;
  }
  @media screen and (min-width: 768px) {
    height: 100%;
  }
`

const SvgLine = ({ start, end }) => {
  return (
    <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="black"/>
  )
}

const GallowsLine = ({ start, end }) => {
  return <SvgLine start={start} end={end}/>
}

const FigureLine = ({ start, end }) => {
  return <SvgLine start={start} end={end}/>
}

const FigureHead = ({ center, radius }) => {
  const cx = center.x
  const cy = center.y

  return <circle cx={cx} cy={cy} r={radius} fill="none" stroke="black"/>
}

export default function GallowsView({ maxGuesses, wrongGuesses, gameOver, victory }) {
  const piecesArray = piecesConfiguration[maxGuesses]

  const width = 100
  const height = 80

  return (
    <GallowsViewWrapper>
      <svg viewBox={`0, 0, ${width}, ${height}`} height="100%" width="auto">
        {Object.values(piecesArray).map(piece => piece)}
      </svg>
    </GallowsViewWrapper>
  )
}

const pieces = {
  gallows: {
    base: {
      1: <GallowsLine start={{x: 10, y: 75}} end={{x: 30, y: 75}}/>,
      2: <GallowsLine start={{x: 30, y: 75}} end={{x: 40, y: 75}}/>,
      3: <GallowsLine start={{x: 40, y: 75}} end={{x: 60, y: 75}}/>,
      4: <GallowsLine start={{x: 10, y: 75}} end={{x: 10, y: 65}}/>,
      5: <GallowsLine start={{x: 60, y: 75}} end={{x: 60, y: 65}}/>,
      6: <GallowsLine start={{x: 10, y: 65}} end={{x: 20, y: 65}}/>,
      7: <GallowsLine start={{x: 20, y: 65}} end={{x: 30, y: 65}}/>,
      8: <GallowsLine start={{x: 30, y: 65}} end={{x: 40, y: 65}}/>,
      9: <GallowsLine start={{x: 40, y: 65}} end={{x: 50, y: 65}}/>,
      10: <GallowsLine start={{x: 50, y: 65}} end={{x: 60, y: 65}}/>,
    },
    upright: {
      1: <GallowsLine start={{x: 30, y: 65}} end={{x: 30, y: 55}}/>,
      2: <GallowsLine start={{x: 30, y: 55}} end={{x: 30, y: 45}}/>,
      3: <GallowsLine start={{x: 30, y: 45}} end={{x: 30, y: 35}}/>,
      4: <GallowsLine start={{x: 30, y: 35}} end={{x: 30, y: 25}}/>,
      5: <GallowsLine start={{x: 30, y: 25}} end={{x: 30, y: 15}}/>
    },
    beam: {
      1: <GallowsLine start={{x: 30, y: 15}} end={{x: 40, y: 15}}/>,
      2: <GallowsLine start={{x: 40, y: 15}} end={{x: 50, y: 15}}/>
    },
    rope: {
      1: <GallowsLine start={{x: 50, y: 15}} end={{x: 50, y: 20}}/>,
      2: <GallowsLine start={{x: 50, y: 20}} end={{x: 50, y: 25}}/>
    }
  },
  figure: {
    head: <FigureHead center={{x: 50, y: 30}} radius={5}/>,
    neck: <FigureLine start={{x: 50, y: 35}} end={{x: 50, y: 40}}/>,
    leftArm: <FigureLine start={{x: 50, y: 40}} end={{x: 45, y: 35}}/>,
    rightArm: <FigureLine start={{x: 50, y: 40}} end={{x: 55, y: 35}}/>,
    torso: <FigureLine start={{x: 50, y: 40}} end={{x: 50, y: 50}}/>,
    leftLeg: <FigureLine start={{x: 50, y: 50}} end={{x: 45, y: 57}}/>,
    rightLeg: <FigureLine start={{x: 50, y: 50}} end={{x: 55, y: 57}}/>
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