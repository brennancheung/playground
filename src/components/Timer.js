import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Container, Grid, Paper, Slider, Typography } from '@material-ui/core'
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
  const y = -distance * Math.sin(anglePolar)
  return { x, y }
}

const polar2Cartesian = (radians, radius) => ({
  x: +radius * Math.cos(radians),
  y: -radius * Math.sin(radians)
})

const renderSegment = ({ id, allocated, state, remaining, options }) => {
  return <path />
}

const style = {
  border: '0px #000 solid',
  margin: '50 250px',
  textAlign: 'center',
  strokeWidth: 0.004,
  stroke: '#000',
}

const renderGridLines = spacing => {
  const nums = []
  for (let i=-1.0; i<=1.0; i+=spacing) nums.push(i)
  return (
    <>
      {nums.map(x =>
        <path key={`x${x}`} stroke="#0001" strokeWidth="0.005" d={`M -1.0 ${x} H1`} />
      )}
      {nums.map(y =>
        <path key={`y${y}`} stroke="#0001" strokeWidth="0.005" d={`M ${y} -1.0 V1`} />
      )}
    </>
  )
}

export const Timer = ({ width, height, segments }) => {
  const [radDistance, setRadDistance] = useState(0.4 * Math.PI)
  const [startAngle, setStartAngle] = useState(Math.PI/2)
  const [radiusInner, setRadiusInner] = useState(0.5)
  const [radiusOuter, setRadiusOuter] = useState(0.8)

  const innerStart = polar2Cartesian(startAngle, radiusInner)
  const outerStart = polar2Cartesian(startAngle, radiusOuter)
  const innerEnd = polar2Cartesian(startAngle - radDistance, radiusInner)
  const outerEnd = polar2Cartesian(startAngle - radDistance, radiusOuter)

  const sweepFlag = radDistance > Math.PI ? 1 : 0

  const wrapOnChange = fn => (e, v) => fn(v)
  const toFixed = digits => num => Number(num).toFixed(digits)
  const fixed2 = toFixed(2)
  const fixed4 = toFixed(4)
  const piUnits = n => fixed2(n / Math.PI)

  const parts = [
    'M', innerStart.x, innerStart.y,
    'L', outerStart.x, outerStart.y,
    'A', radiusOuter, radiusOuter, 0, sweepFlag, 1, outerEnd.x, outerEnd.y,
    'L', innerEnd.x, innerEnd.y,
    'A', radiusInner, radiusInner, 0, sweepFlag, 0, innerStart.x, innerStart.y,
  ]
    .map(x => (typeof x === 'number') && x !== 0 && x !== 1 ? fixed4(x) : x)
    .join(' ')

  const partsStr = parts.split('').map(ch => ['L', 'A'].includes(ch) ? `\n${ch}` : ch).join('')

  const svgParams = { width, height, style }

  return (
    <div>
      <br />
      <Container maxWidth="md">
        <Paper elevation={3}>
          <svg viewBox="-1 -1 2 2" {...svgParams } xmlns="http://www.w3.org/2000/svg" >
            {false && segments.map(renderSegment)}
            {renderGridLines(0.2)}
            <path d={parts} stroke="#000" fill="#ccf" />
            <circle cx="0" cy="0" r="1.0" fill="none" />
            <circle cx="0" cy="0" r="0.05" fill="none" />
          </svg>

          <Box p={2}>
            <pre style={{ whiteSpace: 'pre' }}>{partsStr}</pre>
            <br />

            <Typography gutterBottom>Start angle: {piUnits(startAngle)}π</Typography>
            <Grid container spacing={2}>
              <Grid item xs={1}>0</Grid>
              <Grid item xs={10}>
                <Slider min={0} max={2*Math.PI} value={startAngle} onChange={wrapOnChange(setStartAngle)} step={0.0001} />
              </Grid>
              <Grid item xs={1}>2π</Grid>
            </Grid>
            <br />

            <Typography gutterBottom>Angular distance: {piUnits(radDistance)}π</Typography>
            <Grid container spacing={2}>
              <Grid item xs={1}>0</Grid>
              <Grid item xs={10}>
                <Slider min={0} max={2*Math.PI-0.001} value={radDistance} onChange={wrapOnChange(setRadDistance)} step={0.0001} />
              </Grid>
              <Grid item xs={1}>2π</Grid>
            </Grid>
            <br />

            <Typography gutterBottom>Inner radius: {fixed2(radiusInner)}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={1}>0</Grid>
              <Grid item xs={10}>
                <Slider min={0} max={1} value={radiusInner} onChange={wrapOnChange(setRadiusInner)} step={0.0001} />
              </Grid>
              <Grid item xs={1}>1</Grid>
            </Grid>
            <br />

            <Typography gutterBottom>Outer radius: {fixed2(radiusOuter)}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={1}>0</Grid>
              <Grid item xs={10}>
                <Slider min={0} max={1} value={radiusOuter} onChange={wrapOnChange(setRadiusOuter)} step={0.0001} />
              </Grid>
              <Grid item xs={1}>1</Grid>
            </Grid>
            <br />
          </Box>
        </Paper>
      </Container>
    </div>
  )
}

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
  width: 400.0,
  height: 400.0,
}
