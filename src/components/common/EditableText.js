import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useClickAway } from '../../hooks/useClickAway'

const style = {
  width: '100%',
  fontSize: '16px',
}
// EditableText allows for bimodal control.  There is an editing mode and a
// normal display mode.  The normal display mode uses a render prop pattern.
export const EditableText = ({ value, onChange, children }) => {
  const [isEditing, setIsEditing] = useState(false)
  const ref = useRef(null)
  const handleClickAway = () => setIsEditing(false)
  useClickAway(ref, handleClickAway)

  const handleKeyPress = e => {
    if (e.key === 'Enter') setIsEditing(false)
  }

  const setEditing = () => setIsEditing(true)

  if (isEditing) {
    return <input style={style} ref={ref} type="text" value={value} onChange={onChange} onKeyDown={handleKeyPress} />
  }

  return children({ value, setEditing })
}

EditableText.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  children: PropTypes.func,
}
