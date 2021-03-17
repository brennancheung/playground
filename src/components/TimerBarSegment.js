import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 40px;
  width: ${props => `${props.width}px`};
  position: relative;
  display: flex;
  justify-content: centered;
  align-items: centered;
  margin: 0;
  padding: 0;
  margin-top: 80px;
`

const Elapsed = styled.div`
  height: 40px;
  width: ${props => `${props.width}px`};
  background-image: linear-gradient(90deg, #bdb8d6 25%, #ffffff 25%, #ffffff 50%, #bdb8d6 50%, #bdb8d6 75%, #ffffff 75%, #ffffff 100%);
  background-size: 8.00px 8.00px;
  margin: 0;
  padding: 0;
`

const Overtime = styled.div`
  height: 40px;
  width: ${props => `${props.width}px`};
  background-image: linear-gradient(90deg, #fe4849 25%, #ffffff 25%, #ffffff 50%, #fe4849 50%, #fe4849 75%, #ffffff 75%, #ffffff 100%);
  background-size: 8.00px 8.00px;
  margin: 0;
  padding: 0;
`

const RemainingBar = styled.div`
  width: ${props => `${props.width}px`};
  height: 100%;
  background-color: #5847b4;
`

const TopicNumber = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: middle;
  line-height: 40px;
  color: #fff;
`

const Cursor = styled.div`
  position: absolute;
  top: -38px;
  left: ${props => `${props.offset}px`};
  font-size: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const CursorText = styled.div`
  color: #5847B4;
  width: 70px;
  font-size: 18px;
  text-align: center;
`

const CursorDown = styled.div`
  position: absolute;
  width: 70px;
  margin-top: 30px;
  font-size: 40px;
  text-align: center;
`

const CursorTopic = styled.div`
  color: #5847B4;
  width: 70px;
  font-size: 14px;
  text-align: center;
  top: -16px;
  position: absolute;
`

export const TimerBarSegment = ({ topicNum=3, state='active', allocated=300, elapsed=200, overtime=0, pps=1.0 }) => {
  const elapsedWidth = pps * elapsed
  const overtimeWidth = pps * overtime
  const allocatedWidth = pps * allocated
  const remaining = Math.max(allocated - elapsed, 0)
  const remainingWidth = pps * remaining
  const totalWidth = Math.max(elapsedWidth + remainingWidth + overtimeWidth, allocatedWidth)
  const cursorOffset = elapsedWidth + overtimeWidth

  const showOvertime = overtime > 0
  const showCursor = ['active', 'paused'].includes(state)
  const showTopicOverlay = ['pending'].includes(state)
  const showTopicCursor = ['active', 'paused'].includes(state)

  return (
    <Container width={totalWidth}>
      <Elapsed width={elapsedWidth} />
      <RemainingBar width={remainingWidth} />
      {showOvertime && <Overtime width={overtimeWidth} />}
      {showCursor &&
        <Cursor offset={cursorOffset - 33}>
          <CursorText>3:30</CursorText>
          <CursorDown>▾</CursorDown>
          {showTopicCursor &&
            <CursorTopic>Topic #{topicNum}</CursorTopic>
          }
        </Cursor>
      }
      {showTopicOverlay && <TopicNumber>#{topicNum}</TopicNumber>}
    </Container>
  )
}
