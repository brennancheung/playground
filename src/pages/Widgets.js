import React, { useState } from 'react'
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
  const handleOnChange = e => {
    console.log('handleOnChange')
    const value = e?.target?.value
    console.log(value)
    setTextValue(value)
  }

  return (
    <div>
      <br />

      <WidgetExample title="TimerSegment" code={timerSegmentCode}>
        <TimerBarSegment />
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
