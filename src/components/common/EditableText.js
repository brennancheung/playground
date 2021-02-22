import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ContentState, EditorState, RichUtils, convertToRaw } from 'draft-js'
import Editor from '@draft-js-plugins/editor'
import createLinkifyPlugin from '@draft-js-plugins/linkify'
import 'draft-js/dist/Draft.css'
import '@draft-js-plugins/linkify/lib/plugin.css'

const linkifyPlugin = createLinkifyPlugin()
const plugins = [linkifyPlugin]

const convertToText = state =>
  convertToRaw(state.getCurrentContent()).blocks
    .map(block => (!block.text.trim() && '\n') || block.text)
    .join('\n')

const textToEditorState = text => EditorState.createWithContent(ContentState.createFromText(text))

const style = {
  width: '100%',
  fontSize: '16px',
  border: '1px solid #888',
  lineHeight: '20px',
}

export const EditableText = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    setEditorState(newState)
  }

  const stateJson = convertToRaw(editorState.getCurrentContent())
  const plainText = editorState.getCurrentContent().getPlainText()

  const handleSave = () => {
    localStorage.setItem('saveTest', plainText)
  }

  const handleLoad = () => {
    const text = localStorage.getItem('saveTest')
    if (!text) return
    const cs = ContentState.createFromText(text)
    const es = EditorState.createWithContent(cs)
    setEditorState(es)
  }

  return (
    <div>
      <div>
        <button onClick={() => handleKeyCommand('bold')}>Bold</button>
        <button onClick={() => handleKeyCommand('italic')}>Italic</button>
        <button onClick={() => handleKeyCommand('underline')}>Underline</button>
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
      <button onClick={handleLoad}>Load test</button>
      <button onClick={handleSave}>Save test</button>
      <pre>{editorState.getCurrentContent().getPlainText()}</pre>
      <pre>{JSON.stringify(stateJson, null, 4)}</pre>
    </div>
  )
}

EditableText.propTypes = {
}
