import React, { useEffect, useState } from 'react'
import { Button, Box, Container, Grid, Paper, Slider, Typography } from '@material-ui/core'
import { EditableText } from '../components/common/EditableText'
import { WidgetExample } from '../components/common/WidgetExample'
import { Timer, mockData } from '../components/Timer'
import { TimerBarSegment } from '../components/TimerBarSegment'

const timerCode = `
const mockData = ${JSON.stringify(mockData, null, 2)}
<Timer segments={mockData.segments} />
`

const editableTextCode = `
<EditableText value={textValue} onChange={handleOnChange} />
`

const timerSegmentCode = `
<TimerSegment />
`

export const Widgets = () => {
  const [textValue, setTextValue] = useState('Hello, World!  Click to edit me.')
  const [elapsed, setElapsed] = useState(100)
  const [allocated, setAllocated] = useState(300)
  const [overtime, setOvertime] = useState(0)
  const [state, setState] = useState('active')

  const handleOnChange = e => setTextValue(e?.target?.value)
  const wrapSliderChange = fn => (e, v) => fn(v)

  const maxOvertime = elapsed >= allocated ? 600 : 0

  const handleState = val => () => setState(val)

  const selectedColor = predState => state === predState ? 'primary' : 'default'

  useEffect(() => {
    if (elapsed < allocated) setOvertime(0)
  }, [elapsed])

  return (
    <div>
      <br />

      <WidgetExample title="TimerSegment" code={timerSegmentCode}>
        <TimerBarSegment
          pps={1.0}
          state={state}
          topicNum={3}
          allocated={allocated}
          elapsed={elapsed}
          overtime={overtime}
        />
        <br />
        <br />
        <Container maxWidth="xs">
          <Paper elevation={3}>
            <Box p={2}>
              <Typography gutterBottom>Allocated (seconds) {allocated}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={1}>0</Grid>
                <Grid item xs={10}>
                  <Slider min={0} max={600} value={allocated} onChange={wrapSliderChange(setAllocated)} />
                </Grid>
                <Grid item xs={1}>600</Grid>
              </Grid>
              <br />
            </Box>
            <Box p={2}>
              <Typography gutterBottom>Elapsed (seconds) {elapsed}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={1}>0</Grid>
                <Grid item xs={10}>
                  <Slider min={0} max={allocated} value={elapsed} onChange={wrapSliderChange(setElapsed)} />
                </Grid>
                <Grid item xs={1}>{allocated}</Grid>
              </Grid>
              <br />
            </Box>
            <Box p={2}>
              <Typography gutterBottom>Overtime (seconds) {overtime}</Typography>
              {maxOvertime === 0 && <div>Set elapsed to max to enable</div>}
              <Grid container spacing={2}>
                <Grid item xs={1}>0</Grid>
                <Grid item xs={10}>
                  <Slider min={0} max={maxOvertime} value={overtime} onChange={wrapSliderChange(setOvertime)} />
                </Grid>
                <Grid item xs={1}>{maxOvertime}</Grid>
              </Grid>
              <br />
            </Box>
            <Box p={2}>
              <Typography gutterBottom>State ({state})</Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}><Button variant="contained" color={selectedColor('active')} onClick={handleState('active')}>active</Button></Grid>
                <Grid item xs={4}><Button variant="contained" color={selectedColor('paused')} onClick={handleState('paused')}>paused</Button></Grid>
                <Grid item xs={4}><Button variant="contained" color={selectedColor('pending')} onClick={handleState('pending')}>pending</Button></Grid>
              </Grid>
              <br />
            </Box>
          </Paper>
        </Container>
      </WidgetExample>
      <WidgetExample title="EditableText" code={editableTextCode}>
        <EditableText value={textValue} onChange={handleOnChange} />
      </WidgetExample>
      <WidgetExample title="Timer" code={timerCode}>
        <Timer segments={mockData.segments} />
      </WidgetExample>
    </div>
  )
}
