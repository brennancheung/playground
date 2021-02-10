import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Container, Grid, Paper, Slider, Typography } from '@material-ui/core'
import { v4 as uuid } from 'uuid'
import { TimerSegment, TimerSegmentStates } from './TimerSegment'
import { ElapsedSegment } from './ElapsedSegment'
import { sum } from '../util'
import { pluck } from 'ramda'

/*
 * The code below makes use of the "unit circle" in trigonometry.
 * Make sure to familiarize yourself with it before working on this code.
 *
 * https://en.wikipedia.org/wiki/Unit_circle
 *
 * Note: The unit circle starts on the right (1, 0) and runs counter-clockwise.
*/

const ORIGIN_ANGLE = Math.PI / 2.0

// polar angular distance separating multiple segments
const SEGMENT_GAP = Math.PI / 30

const style = {
  border: '0px #000 solid',
  margin: '50 250px',
  textAlign: 'center',
  strokeWidth: 0.004,
  stroke: '#000',
}

const annotateSegments = segments => {
  const totalSegmentGaps = segments.length * SEGMENT_GAP
  const remaining = 2.0 * Math.PI - totalSegmentGaps
  const radiansPerSecond = remaining / sum(pluck('allocated', segments))
  const annotatedSegments = []
  const elapsedSegments = []
  let cursorAngle = ORIGIN_ANGLE

  segments.forEach(segment => {
    const elapsed = segment.allocated - segment.remaining
    const elapsedRadians = elapsed * radiansPerSecond

    if (elapsed > 0) {
      const elapsedSegment = {
        id: `elapsed-${segment.id}`,
        startAngle: cursorAngle,
        angularDistance: elapsedRadians,
      }
      elapsedSegments.push(elapsedSegment)
    }
    cursorAngle -= elapsedRadians

    const annotated = ({
      ...segment,
      startAngle: cursorAngle,
      angularDistance: radiansPerSecond * (segment.allocated - elapsed),
    })

    annotatedSegments.push(annotated)
    cursorAngle -= annotated.angularDistance + SEGMENT_GAP
  })

  return { annotated: annotatedSegments, elapsed: elapsedSegments }
}

export const Timer = ({ width, height, segments }) => {
  const { annotated, elapsed } = annotateSegments(segments)
  console.log(elapsed)

  return (
    <div>
      <br />
      <Container maxWidth="md">
        <Paper elevation={3}>
          <svg viewBox="-1 -1 2 2" width={width} height={height} style={style} xmlns="http://www.w3.org/2000/svg" >
            {annotated.map(segment => <TimerSegment key={segment.id} {...segment} />)}
            {elapsed.map(segment => <ElapsedSegment key={segment.id} {...segment} />)}
          </svg>
        </Paper>
      </Container>
    </div>
  )
}

export const SegmentType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  allocated: PropTypes.number.isRequired,
  state: PropTypes.oneOf(TimerSegmentStates),
  remaining: PropTypes.number.isRequired,
  options: PropTypes.object,
})

export const mockData = {
  segments: [
    { id: uuid(), allocated: 600.0, state: 'running', remaining: 412.0 },
    { id: uuid(), allocated: 480.0, state: 'paused', remaining: 480.0 },
    { id: uuid(), allocated: 300.0, state: 'paused', remaining: 300.0 },
  ]
}
Timer.propTypes = {
  segments: PropTypes.arrayOf(SegmentType).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
}

Timer.defaultProps = {
  width: 400.0,
  height: 400.0,
  segment: mockData.segments,
}

/*
const renderGridLines = spacing => {
  const nums = []
  for (let i=-1.0; i<=1.0; i+=spacing) nums.push(i)
  return (
    <>
      {nums.map(x => <path key={`x${x}`} stroke="#0001" strokeWidth="0.005" d={`M -1.0 ${x} H1`} />)}
      {nums.map(y => <path key={`y${y}`} stroke="#0001" strokeWidth="0.005" d={`M ${y} -1.0 V1`} />)}
    </>
  )
}
*/
