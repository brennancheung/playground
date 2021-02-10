import React from 'react'
import PropTypes from 'prop-types'

const INNER_RADIUS = 0.50
const OUTER_RADIUS = 0.80

const rad2deg = rad => rad * (180.0 / Math.PI)
const deg2rad = deg => deg * (Math.PI / 180.0)

const polar2Cartesian = (radians, radius) => ({
  x: +radius * Math.cos(radians),
  y: -radius * Math.sin(radians)
})

export const TimerSegment = ({ id, state, startAngle, angularDistance  }) => {
  const innerStart = polar2Cartesian(startAngle, INNER_RADIUS)
  const outerStart = polar2Cartesian(startAngle, OUTER_RADIUS)
  const innerEnd = polar2Cartesian(startAngle - angularDistance, INNER_RADIUS)
  const outerEnd = polar2Cartesian(startAngle - angularDistance, OUTER_RADIUS)

  const sweepFlag = angularDistance > Math.PI ? 1 : 0

  const toFixed = digits => num => Number(num).toFixed(digits)
  const fixed4 = toFixed(4)

  const parts = [
    'M', innerStart.x, innerStart.y,
    'L', outerStart.x, outerStart.y,
    'A', OUTER_RADIUS, OUTER_RADIUS, 0, sweepFlag, 1, outerEnd.x, outerEnd.y,
    'L', innerEnd.x, innerEnd.y,
    'A', INNER_RADIUS, INNER_RADIUS, 0, sweepFlag, 0, innerStart.x, innerStart.y,
  ]
    .map(x => (typeof x === 'number') && x !== 0 && x !== 1 ? fixed4(x) : x)
    .join(' ')

  return (
    <path d={parts} stroke="#000" fill="#ccf" />
  )
}

export const TimerSegmentStates = ['paused', 'running', 'finished']

TimerSegment.propTypes = {
  id: PropTypes.string,
  state: PropTypes.oneOf(['paused', 'running', 'finished']),
  startAngle: PropTypes.number.isRequired,
  angularDistance: PropTypes.number,
}

TimerSegment.defaultProps = {
  angularDistance: 0.4 * Math.PI,
  startAngle: Math.PI / 2.0,
}
