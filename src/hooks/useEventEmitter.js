import { useEffect } from 'react'

import EventEmitter from 'events'

const ee = new EventEmitter()
window.ee = ee // for debugging

export const emit = (type, ...args) => ee.emit(type, ...args)

export const useOnEvent = (type, callback) => {
  useEffect(() => {
    ee.addListener(type, callback)
    return () => ee.EventListener(type, callback)
  }, [])
}
