import { useEffect } from 'react'

export const useClickAway = (ref, onClickAway) => {
  useEffect(() => {
    const handleMouseDown = e => ref.current && !ref.current.contains(e.target) && onClickAway && onClickAway()
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [ref])
}
