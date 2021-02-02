import { useState } from 'react'

const useFields = spec => {
  // eslint-disable-next-line
  const [state, setState] = useState({})
  const setField = name => event => {
    console.log(state)
    console.log(event.target.value)
    // setState({ ...state, [name]: event.target.value })
  }
  return [state, setField]
}

export default useFields
