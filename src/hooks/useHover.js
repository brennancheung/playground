// credit: https://usehooks.com/useHover/

import { useEffect, useRef, useState } from 'react'

const useHover = () => {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)

  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => setHovered(false)

  useEffect(
    () => {
      const node = ref.current
      if (node) {
        node.addEventListener('mouseenter', handleMouseEnter)
        node.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          node.removeEventListener('mouseenter', handleMouseEnter)
          node.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    },
    [ref.current] // Recall only if ref changes
  )

  return [ref, hovered]
}

export default useHover
