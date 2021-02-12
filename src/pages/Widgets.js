import React, { useState } from 'react'
import { EditableText } from '../components/common/EditableText'
import { WidgetExample } from '../components/common/WidgetExample'
import { Timer, mockData } from '../components/Timer'
import { wrapEventValue } from '../util'

const timerCode = `
const mockData = ${JSON.stringify(mockData, null, 2)}
<Timer segments={mockData.segments} />
`

const editableTextCode = `
<EditableText value={textValue} onChange={wrapEventValue(setTextValue)}>{
  ({ value, setEditing, ...params }) => (
    <div onClick={setEditing} {...params}>{value}</div>
  )
}
`

export const Widgets = () => {
  const [textValue, setTextValue] = useState('Hello, World!  Click to edit me.')

  return (
    <div>
      <br />

      <WidgetExample title="EditableText" code={editableTextCode}>
        <EditableText value={textValue} onChange={wrapEventValue(setTextValue)}>{
          ({ value, setEditing, ...params }) => (
            <div onClick={setEditing} {...params}>{value}</div>
          )
        }
        </EditableText>
      </WidgetExample>
      <WidgetExample title="Timer" code={timerCode}>
        <Timer segments={mockData.segments} />
      </WidgetExample>
    </div>
  )
}
