import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { TimerBarSegment } from './TimerBarSegment'

const CONTAINER_WIDTH = 800.0
const TOPIC_MARGIN = 5

const Container = styled.div`
  display: flex;
  max-width: ${CONTAINER_WIDTH};
  border: 1px solid #000;
  justify-content: space-between;
`

const mockTopics = [
  { topicNum: 1, allocated: 300, elapsed: 100, overtime: 0, state: 'active' },
  { topicNum: 2, allocated: 200, elapsed: 0, overtime: 0, state: 'pending' },
]

const calcTotalSeconds = topics => topics.reduce(
  (accum, topic) => accum + topic.allocated + (topic.overtime || 0),
  0
)

export const TimerBarsMeeting = ({ topics=mockTopics }) => {
  const totalSeconds = calcTotalSeconds(topics)
  const width = CONTAINER_WIDTH - (topics.length - 1) * TOPIC_MARGIN
  const pps = width / totalSeconds
  return (
    <div style={{ width: CONTAINER_WIDTH }}>
      <Container>
        {topics.map(t => <TimerBarSegment key={t.topicNum} {...t} pps={pps} />)}
      </Container>
    </div>
  )
}

TimerBarsMeeting.propTypes = {
  topics: PropTypes.arrayOf(TimerBarSegment.propTypes)
}
