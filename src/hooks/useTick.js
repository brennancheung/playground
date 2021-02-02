import { useEffect } from 'react'

const useTick = (callback, ms) => {
  useEffect(() => {
    const intervalId = setInterval(callback, ms)
    return () => clearInterval(intervalId)
  })
}

export default useTick
