import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { EditorState, RichUtils, convertToRaw } from 'draft-js'
import Editor from '@draft-js-plugins/editor'
import createLinkifyPlugin from '@draft-js-plugins/linkify'
import 'draft-js/dist/Draft.css'

const linkifyPlugin = createLinkifyPlugin()
const plugins = [linkifyPlugin]

const style = {
  width: '100%',
  fontSize: '16px',
  border: '1px solid #888',
}
// EditableText allows for bimodal control.  There is an editing mode and a
// normal display mode.  The normal display mode uses a render prop pattern.
export const EditableText = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    setEditorState(newState)
  }

  const stateJson = convertToRaw(editorState.getCurrentContent())

  return (
    <div>
      <div>
        <button onClick={() => handleKeyCommand('bold')}>Bold</button>
        <button onClick={() => handleKeyCommand('code')}>Code</button>
      </div>
      <div style={style}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          plugins={plugins}
        />
      </div>
      <pre>{JSON.stringify(stateJson, null, 4)}</pre>
    </div>
  )
}

EditableText.propTypes = {
}
