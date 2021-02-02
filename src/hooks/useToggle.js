import { useCallback, useState } from 'react'

export const useToggle = ({ initialValue = false }) => {
  const [active, setActive] = useState(initialValue)
  const handleToggle = useCallback(() => {
    setActive(state => !state)
  })
  return [active, handleToggle]
}
