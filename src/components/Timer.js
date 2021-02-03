import React from 'react'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'

/*
 * The code below makes use of the "unit circle" in trigonometry.
 * Make sure to familiarize yourself with it before working on this code.
 *
 * https://en.wikipedia.org/wiki/Unit_circle
 *
 * Note: The unit circle starts on the right (1, 0) and runs counter-clockwise.
*/

const ORIGIN_ANGLE = Math.PI / 2.0

// Distance between inner and outer parts of segment.
const SEGMENT_RADIUS = 2.0

// polar angular distance separating multiple segments
const SEGMENT_GAP = Math.PI / 20

const calcSegmentGaps = numSegments => numSegments * SEGMENT_GAP

const rad2deg = rad => rad * (180.0 / Math.PI)
const deg2rad = deg => deg * (Math.PI / 180.0)

const polarToCartesian = (angleDeg, distance) => {
  const anglePolar = ORIGIN_ANGLE - deg2rad(angleDeg)
  const x = distance * Math.cos(anglePolar)
  const y = distance * Math.sin(anglePolar)
  return { x, y }
}

/*
function describeArc(x, y, innerRadius, outerRadius, startAngle, endAngle){
  var radius = innerRadius;
  var spread = outerRadius - innerRadius;
  var innerStart = polarToCartesian(x, y, radius, endAngle);
  var innerEnd = polarToCartesian(x, y, radius, startAngle);
  var outerStart = polarToCartesian(x, y, radius + spread, endAngle);
  var outerEnd = polarToCartesian(x, y, radius + spread, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
      "M", outerStart.x, outerStart.y,
      "A", radius + spread, radius + spread, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
      "L", innerEnd.x, innerEnd.y,
      "A", radius, radius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      "L", outerStart.x, outerStart.y, "Z"
  ].join(" ");

  return d;
}
*/

const renderSegment = ({ id, allocated, state, remaining, options }) => {
  return <path />
}

export const Timer = ({ width, height, segments }) => {
  const radDistance = 1.0 * Math.PI
  const r = 0.7
  console.log(width, height, segments)

  const outerStart = {
    x: width/2.0 + 1.0 * width/2.0 * Math.cos(Math.PI/2),
    y: height/2.0 + 1.0 * height/2.0 * Math.sin(Math.PI/2),
  }

  const innerStart = {
    x: width/2.0 + (1.0 - r) * width/2.0 * Math.cos(Math.PI/2),
    y: height/2.0 + (1.0 - r) * height/2.0 * Math.sin(Math.PI/2),
  }

  const outerEnd = {
    x: width/2.0 + 1.0 * width/2.0 * Math.cos(Math.PI/2 - radDistance),
    y: height/2.0 + 1.0 * height/2.0 * Math.sin(Math.PI/2 - radDistance),
  }

  const innerEnd = {
    x: width/2.0 + (1.0 - r) * width/2.0 * Math.cos(Math.PI/2 - radDistance),
    y: height/2.0 + (1.0 - r) * height/2.0 * Math.sin(Math.PI/2 - radDistance),
  }

  const parts = [
    `M ${outerStart.x} ${outerStart.y}`,
    `L ${innerStart.x} ${innerStart.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `L ${outerEnd.x} ${outerEnd.y}`,
    'Z',
  ].join(' ')

  console.log(parts)

  return (
    <svg width={width} height={height} style={{ border: '1px #000 solid', margin: '50px' }}>
      {false && segments.map(renderSegment)}
      <path stroke="#0002" d="M 100 0 V500" />
      <path stroke="#0002" d="M 200 0 V500" />
      <path stroke="#0002" d="M 300 0 V500" />
      <path stroke="#0002" d="M 400 0 V500" />

      <path stroke="#0002" d="M 0 100 H500" />
      <path stroke="#0002" d="M 0 200 H500" />
      <path stroke="#0002" d="M 0 300 H500" />
      <path stroke="#0002" d="M 0 400 H500" />

      {true && <path d={parts} stroke="#000" fill="none" />}
    </svg>
  )
}

// <path stroke="#000" d="M 500 250 L 250 0" />
// <path d=" M 299 200 A 100 100 0 0 1 199 300" />

export const mockData = {
  segments: [
    { id: uuid(), allocated: 600.0, state: 'running', remaining: 412.0 },
    { id: uuid(), allocated: 480.0, state: 'paused', remaining: 480.0 },
  ]
}

export const TimerSegmentStates = ['paused', 'running', 'finished']

export const SegmentType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  allocated: PropTypes.number.isRequired,
  state: PropTypes.oneOf(TimerSegmentStates),
  remaining: PropTypes.number.isRequired,
  options: PropTypes.object,
})

Timer.propTypes = {
  segments: PropTypes.arrayOf(SegmentType).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
}

Timer.defaultProps = {
  width: 500.0,
  height: 500.0,
}
