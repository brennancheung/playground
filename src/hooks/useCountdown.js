import { useEffect, useRef, useState } from 'react'

// React hooks necessitates this rather convoluted logic.
// For more background see:
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/

export const useCountdown = (seconds, onComplete) => {
  const [remaining, setRemaining] = useState(seconds)
  const savedCallback = useRef()

  const callback = () => {
    if (remaining === 0) return
    setRemaining(remaining - 1)
    if (remaining === 1 && onComplete) onComplete()
  }

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    const tick = () => savedCallback.current()

    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [seconds])

  return remaining
}
