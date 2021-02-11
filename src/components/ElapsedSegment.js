import React from 'react'
import PropTypes from 'prop-types'
import { times } from '../util'
const INNER_RADIUS = 0.50
const OUTER_RADIUS = 0.80

// Spacing between ticks in radians
const tickInterval = Math.PI / 100

const polar2Cartesian = (radians, radius) => ({
  x: +radius * Math.cos(radians),
  y: -radius * Math.sin(radians)
})

const toFixed = digits => num => Number(num).toFixed(digits)
const fixed4 = toFixed(4)

const pathLine = (start, stop) => {
  const parts = [
    'M', start.x, start.y,
    'L', stop.x, stop.y,
  ]
    .map(x => (typeof x === 'number') && x !== 0 && x !== 1 ? fixed4(x) : x)
    .join(' ')

  const key = `tick-${start.x}-${start.y}`
  return <path key={key} d={parts} stroke="#000" />
}

export const ElapsedSegment = ({ id, startAngle, angularDistance }) => {
  const numTicks = angularDistance / tickInterval
  if (numTicks === 0) return null
  const tickAngles = times(numTicks).map(i => startAngle - i * tickInterval)
  const ticks = tickAngles.map(theta => ({
    inner: polar2Cartesian(theta, INNER_RADIUS),
    outer: polar2Cartesian(theta, OUTER_RADIUS),
  }))
    .map(tick => pathLine(tick.inner, tick.outer))

  return (
    <>
      {ticks}
    </>
  )
}

export const TimerSegmentStates = ['paused', 'running', 'finished']

ElapsedSegment.propTypes = {
  id: PropTypes.string,
  startAngle: PropTypes.number.isRequired,
  angularDistance: PropTypes.number,
}

ElapsedSegment.defaultProps = {
  angularDistance: 0.4 * Math.PI,
  startAngle: Math.PI / 2.0,
}
