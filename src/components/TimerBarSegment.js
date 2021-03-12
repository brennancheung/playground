import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 40px;
  position: relative;
  background-image: linear-gradient(90deg, #bdb8d6 25%, #ffffff 25%, #ffffff 50%, #bdb8d6 50%, #bdb8d6 75%, #ffffff 75%, #ffffff 100%);
  background-size: 8.00px 8.00px;
  display: flex;
  justify-content: centered;
  align-items: centered;
  margin: 0;
  padding: 0;
  margin-top: 40px;
`

const RemainingBar = styled.div`
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
  left: 85px;
  font-size: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const CursorText = styled.div`
  color: #5847B4;
  font-size: 18px;
  text-align: center;
`

const CursorDown = styled.div`
  position: absolute;
  margin-top: 30px;
  font-size: 40px;
  text-align: center;
`

export const TimerBarSegment = () => {
  const remainingStyle = {
    marginLeft: '100px',
    width: '400px',
  }

  return (
    <Container>
      <Cursor>
        <CursorText>3:30</CursorText>
        <CursorDown>▾</CursorDown>
      </Cursor>
      <TopicNumber>#3</TopicNumber>
      <RemainingBar style={remainingStyle} />
    </Container>
  )
}
