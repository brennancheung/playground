import { useCallback, useState } from 'react'
import useTick from './useTick'

const TICK_RESOLUTION_MS = 250
const isActive = event => Date.now() <= event.expireAt
const removeExpireAt = ({ expireAt, ...rest }) => ({ ...rest })

const useTransient = () => {
  const [events, setEvents] = useState([])

  const addTransient = useCallback((data, ms) => {
    const event = { ...data, expireAt: Date.now() + ms }
    setEvents(events => [...events, event])
  })

  const tick = useCallback(() => {
    setEvents(events => events.filter(isActive))
  })

  useTick(tick, TICK_RESOLUTION_MS)

  return [events.map(removeExpireAt), addTransient]
}

export default useTransient
